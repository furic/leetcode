# Sort and Sliding Window | 13 Lines | O(n log n) | 6ms

# Intuition

To minimize the difference between highest and lowest scores, select k students with closest scores. After sorting, the minimum range of k elements must be contiguous. Use a sliding window to find the smallest range.

# Approach

**Sort and Slide:**
1. Sort array in ascending order
2. Use sliding window of size k
3. For each window, difference = last - first element
4. Track minimum difference across all windows

**Why This Works:**
- In sorted array, any k elements have difference ≥ (max - min)
- To minimize this, choose consecutive elements
- Sliding window tries all consecutive k-element groups

**Example: nums=[9,4,1,7], k=2**

Sort: [1,4,7,9]

Windows:
- [1,4]: diff = 4-1 = 3
- [4,7]: diff = 7-4 = 3
- [7,9]: diff = 9-7 = 2 ✓

Minimum: 2 ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sort: O(n log n)
  - Sliding window: O(n)
  - Overall: O(n log n)

- Space complexity: $$O(1)$$
  - In-place sort (typically)
  - Only scalar variables
  - Overall: O(1) auxiliary space

# Code
```typescript []
const minimumDifference = (nums: number[], k: number): number => {
    if (k === 1) return 0;

    nums.sort((a, b) => a - b);
    
    const numStudents = nums.length;
    let minDifference = Infinity;

    for (let windowStart = 0; windowStart <= numStudents - k; windowStart++) {
        const windowEnd = windowStart + k - 1;
        const windowDifference = nums[windowEnd] - nums[windowStart];
        
        minDifference = Math.min(minDifference, windowDifference);
    }
    
    return minDifference;
};
```