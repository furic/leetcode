# Backward Suffix Sum | 9 Lines | O(n) |0ms

# Intuition

For each index i, check if nums[i] > average of elements to its right. Build suffix sum backward to compute averages efficiently in O(1) per position.

# Approach

**Backward Scan with Suffix Sum:**
1. Start from rightmost element (skip it, not dominant)
2. Maintain running sum of elements to the right
3. For each index i:
   - Average = sum / count of elements to right
   - Check if nums[i] > average
   - Add nums[i] to sum for next iteration

**Why Backward:**
- Each position needs sum of elements to its right
- Building backward avoids recomputation
- Single pass with O(1) per position

**Example: nums=[5,4,3]**

Backward scan:
- i=2: skip (rightmost), sum=3
- i=1: 4 > 3/1=3 ✓, count++, sum=7
- i=0: 5 > 7/2=3.5 ✓, count++

Result: 2 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single backward pass
  - Constant work per element
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only sum and count variables
  - No additional data structures

# Code
```typescript []
const dominantIndices = (nums: number[]): number => {
    const n = nums.length;
    let sum = nums[n - 1];
    let count = 0;
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] > sum / (n - i - 1)) count++;
        sum += nums[i];
    }
    return count;
};
```