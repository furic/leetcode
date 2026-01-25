# Extract, Rotate, Place Back | 20 Lines | O(n) | 28ms

# Intuition

Extract non-negative elements, rotate them cyclically by k positions, then place them back into their original non-negative positions while keeping negatives fixed.

# Approach

**Three-Step Process:**
1. **Extract**: Collect all non-negative elements in order
2. **Rotate**: Perform cyclic left rotation by k positions
   - Use modulo to handle k > length
   - Slice and concatenate: [...arr.slice(k), ...arr.slice(0,k)]
3. **Place Back**: Put rotated elements into original non-negative positions

**Edge Cases:**
- If no positives exist, return original array
- k % positives.length handles wraparound

**Example: nums=[1,-2,3,-4], k=3**

Extract: [1,3]
Rotate left 3: k%2=1
- [1,3] → [3,1]

Place back:
- Position 0 (was 1≥0): 3
- Position 1 (was -2<0): -2 (unchanged)
- Position 2 (was 3≥0): 1
- Position 3 (was -4<0): -4 (unchanged)

Result: [3,-2,1,-4] ✓

# Complexity

- Time complexity: $$O(n)$$
  - Extract positives: O(n)
  - Rotate (slice): O(p) where p=positives
  - Place back: O(n)
  - Overall: O(n)

- Space complexity: $$O(p)$$
  - Positives array: O(p)
  - Rotated array: O(p)
  - Where p = number of non-negative elements
  - Overall: O(n) worst case

# Code
```typescript []
const rotateElements = (nums: number[], k: number): number[] => {
    const n = nums.length;

    let positives: number[] = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] >= 0) {
            positives.push(nums[i]);
        }
    }

    if (positives.length === 0) return nums;

    const rotateCount = k % positives.length;
    positives = [
        ...positives.slice(rotateCount),
        ...positives.slice(0, rotateCount),
    ];

    let j = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] >= 0) {
            nums[i] = positives[j++];
        }
    }

    return nums;
};
```