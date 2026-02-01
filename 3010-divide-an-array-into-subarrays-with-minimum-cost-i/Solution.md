# Find Two Smallest After First | 23 Lines | O(n) | 0ms

# Intuition

The first subarray must start at index 0, so its cost (nums[0]) is fixed. To minimize total cost, choose the two smallest values from nums[1..n-1] as the first elements of the second and third subarrays.

# Approach

**Key Observations:**
- First subarray must start at nums[0] → cost = nums[0] (fixed)
- Second subarray starts somewhere in [1, n-2] → cost = nums[i]
- Third subarray starts somewhere in [i+1, n-1] → cost = nums[j]
- To minimize: choose smallest and second smallest from nums[1..n-1]

**Algorithm:**
1. Cost of first subarray = nums[0]
2. Find two smallest values in nums[1..n-1]:
   - Track smallest and secondSmallest
   - Update as we scan
3. Return nums[0] + smallest + secondSmallest

**Why This Works:**
- We have flexibility in where to split
- Any valid split has costs: nums[0] + nums[i] + nums[j] where 1≤i<j≤n-1
- Minimum achieved when nums[i] and nums[j] are the two smallest

**Example: nums=[1,2,3,12]**

First cost: 1
Scan [2,3,12]:
- smallest=2, secondSmallest=3

Total: 1+2+3=6 ✓

Split: [1], [2], [3,12]

# Complexity

- Time complexity: $$O(n)$$
  - Single pass to find two smallest
  - Constant work per element
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only two variables (smallest, secondSmallest)
  - No additional data structures

# Code
```typescript []
const minimumCost = (nums: number[]): number => {
    const firstSubarrayCost = nums[0];
    
    let secondSmallest = Infinity;
    let smallest = Infinity;
    
    for (let index = 1; index < nums.length; index++) {
        const currentValue = nums[index];
        
        if (currentValue < smallest) {
            secondSmallest = smallest;
            smallest = currentValue;
        } else if (currentValue < secondSmallest) {
            secondSmallest = currentValue;
        }
    }
    
    return firstSubarrayCost + smallest + secondSmallest;
};
```