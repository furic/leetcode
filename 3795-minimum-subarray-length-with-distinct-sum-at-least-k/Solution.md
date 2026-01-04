# Sliding Window with Distinct Sum | 27 Lines | O(n) | 163ms

# Intuition

We need a subarray whose distinct element sum ≥ k. Using a sliding window, we expand to include elements and track distinct values, then shrink to find the minimum length while maintaining the sum constraint.

# Approach

**Sliding Window Strategy:**
- Expand window by moving `right` pointer
- Track distinct elements and their sum using a frequency map
- When distinct sum ≥ k, try shrinking from left to find minimum length
- Continue until we've processed all elements

**Distinct Sum Tracking:**
- Use Map to count element frequencies
- Add to `distinctSum` only when element first appears
- Subtract from `distinctSum` only when element fully removed (count = 0)

**Example: nums=[2,2,3,1], k=4**

Initial: left=0, distinctSum=0

right=0: Add 2 → distinct={2}, sum=2
- sum<4, continue

right=1: Add 2 → distinct={2}, sum=2 (already counted)
- sum<4, continue

right=2: Add 3 → distinct={2,3}, sum=5
- sum≥4! minLen=3 (subarray [2,2,3])
- Shrink: remove nums[0]=2, count=1 → distinct={2,3}, sum=5
- sum≥4! minLen=2 (subarray [2,3]) ✓
- Shrink: remove nums[1]=2, count=0 → distinct={3}, sum=3
- sum<4, stop shrinking

right=3: Add 1 → distinct={3,1}, sum=4
- sum≥4! minLen=2 (already minimum)

Result: 2 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Each element added once (right pointer)
  - Each element removed at most once (left pointer)
  - Map operations: O(1) average
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Map stores at most n distinct elements
  - Worst case: all elements unique

# Code
```typescript []
const minLength = (nums: number[], k: number): number => {
    const n = nums.length;
    let minLen = Infinity;
    let left = 0;
    const count = new Map<number, number>();
    let distinctSum = 0;
    
    for (let right = 0; right < n; right++) {
        if (!count.has(nums[right])) {
            distinctSum += nums[right];
        }
        count.set(nums[right], (count.get(nums[right]) || 0) + 1);
        
        while (distinctSum >= k) {
            minLen = Math.min(minLen, right - left + 1);
            
            const leftVal = nums[left];
            count.set(leftVal, count.get(leftVal) - 1);
            if (count.get(leftVal) === 0) {
                count.delete(leftVal);
                distinctSum -= leftVal;
            }
            left++;
        }
    }
    
    return minLen === Infinity ? -1 : minLen;
};
```