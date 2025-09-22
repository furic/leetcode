# Greedy Maximum Difference | 1 Line | O(n) | 3ms

# Intuition
Since we can choose the same subarray multiple times and subarrays can overlap, the optimal strategy is to maximize each individual subarray's value. The maximum possible value for any subarray is achieved when it contains both the global maximum and global minimum of the entire array. Since we can choose this optimal subarray k times, the answer is simply k times the difference between the array's max and min values.

# Approach
I'll use a greedy strategy based on global extremes:

1. **Find Global Extremes**: Identify the maximum and minimum values in the entire array. These two values, when included in a subarray, produce the maximum possible value for any subarray.

2. **Optimal Subarray**: The subarray that contains both the global max and global min has value = max - min. This is the highest value any subarray can achieve.

3. **Repetition Strategy**: Since we can choose the same subarray multiple times (and we need to choose exactly k subarrays), we simply choose this optimal subarray k times.

4. **Mathematical Formula**: Maximum total value = (max(nums) - min(nums)) × k

5. **Why This Works**: Any other subarray either:
   - Has a smaller max or larger min, reducing its value
   - Is the same optimal subarray we're already counting
   - Therefore, repeating the best subarray k times is optimal

# Complexity
- Time complexity: $$O(n)$$
  - Finding maximum value: O(n)
  - Finding minimum value: O(n)
  - Multiplication operation: O(1)
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only using constant space for max, min calculations
  - No additional data structures needed
  - All operations performed with primitive values

# Code
```typescript []
const maxTotalValue = (nums: number[], k: number): number => (Math.max(...nums) - Math.min(...nums)) * k;
```