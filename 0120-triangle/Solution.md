# Bottom-Up Dynamic Programming | 11 Lines | O(n²) | 2ms

# Intuition
This is a classic dynamic programming problem where we need to find the minimum path sum from top to bottom. The key insight is to work backwards from the bottom row, where we already know the base values, and propagate the minimum costs upward. Each position can only move to adjacent positions in the next row, so we can use this constraint to build optimal subproblem solutions.

# Approach
I'll use bottom-up dynamic programming with space optimization:

1. **Start from Bottom**: Initialize our DP array with the bottom row values since these are already the minimum costs for reaching each bottom position.

2. **Work Upward**: Process rows from second-to-last up to the top, calculating the minimum path sum for each position based on the two possible moves to the row below.

3. **Recurrence Relation**: For each position (i, j), the minimum path sum is:
   `dp[j] = triangle[i][j] + min(dp[j], dp[j+1])`
   where dp[j] and dp[j+1] represent the minimum costs from the two adjacent positions below.

4. **Space Optimization**: Instead of using a 2D DP table, we can reuse a single array since we only need the previous row's results to calculate the current row.

5. **Final Answer**: After processing all rows, the top of the triangle (dp[0]) contains the minimum path sum from top to bottom.

# Complexity
- Time complexity: $$O(n^2)$$
  - Process each row from bottom to top: O(n) rows
  - For each row i, process i+1 elements: 1+2+...+n = O(n²) total elements
  - Each element processed in constant time

- Space complexity: $$O(n)$$
  - Single DP array storing at most n elements (bottom row size)
  - No additional space that scales beyond the triangle's width
  - Space-optimized from O(n²) to O(n) by reusing the same array

# Code
```typescript []
const minimumTotal = (triangle: number[][]): number => {
    const totalRows = triangle.length;
    const minimumPathSums = [...triangle[totalRows - 1]];

    for (let currentRow = totalRows - 2; currentRow >= 0; currentRow--) {
        for (let columnIndex = 0; columnIndex <= currentRow; columnIndex++) {
            minimumPathSums[columnIndex] = triangle[currentRow][columnIndex] + 
                Math.min(minimumPathSums[columnIndex], minimumPathSums[columnIndex + 1]);
        }
    }
    
    return minimumPathSums[0];
};
```