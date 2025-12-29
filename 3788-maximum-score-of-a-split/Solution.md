# Backward Sweep Optimization | 13 Lines | O(n) | 4ms

# Intuition

For each split point i, we need sum[0..i] minus min[i+1..n-1]. Instead of recalculating these for every split (O(n²)), we can iterate backwards while maintaining both the prefix sum and suffix minimum incrementally in O(1) per split.

# Approach

**Core Strategy:**
- Iterate splits from right to left (i from n-2 down to 0)
- Maintain running leftSum (prefix sum) and rightMin (suffix minimum)
- As we move left, one element shifts from left part to right part
- Update both values incrementally: leftSum decreases, rightMin updates with new element

**Key Insight:**
When moving from split i to split i-1:
- Left part loses nums[i] → leftSum -= nums[i]
- Right part gains nums[i] → rightMin = min(rightMin, nums[i])

**Example (nums = [10,-1,3,-4,-5]):**

Initialize:
- leftSum = 10+(-1)+3+(-4) = 8 (sum of indices 0-3)
- rightMin = -5 (last element)

Split i=3: score = 8-(-5) = 13
- Update: leftSum = 8-(-4) = 12, rightMin = min(-5,-4) = -5

Split i=2: score = 12-(-5) = 17 ✓ (maximum)
- Update: leftSum = 12-3 = 9, rightMin = min(-5,3) = -5

Split i=1: score = 9-(-5) = 14
- Update: leftSum = 9-(-1) = 10, rightMin = min(-5,-1) = -5

Split i=0: score = 10-(-5) = 15

**Result: 17**

# Complexity

- Time complexity: $$O(n)$$
  - Initial sum calculation: O(n)
  - Main loop: O(n) with O(1) per iteration
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only scalar variables (leftSum, rightMin, maxScore)
  - No arrays or recursion

# Code
```typescript []
const maximumScore = (nums: number[]): number => {
    const arrayLength = nums.length;
    let leftSum = 0;
    let maxScore = -Infinity;
    let rightMin = nums[arrayLength - 1];

    for (let i = 0; i < arrayLength - 1; i++) {
        leftSum += nums[i];
    }

    for (let splitIndex = arrayLength - 2; splitIndex >= 0; splitIndex--) {
        maxScore = Math.max(leftSum - rightMin, maxScore);
        
        rightMin = Math.min(rightMin, nums[splitIndex]);
        leftSum -= nums[splitIndex];
    }

    return maxScore;
};
```