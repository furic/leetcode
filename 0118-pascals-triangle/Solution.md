# Dynamic Programming Build | 14 Lines | O(n²) | 0ms

# Intuition
Pascal's triangle has a clear pattern where each row starts and ends with 1, and every interior element is the sum of the two elements directly above it from the previous row. This suggests a straightforward iterative approach where we build each row based on the previous row, starting from the base case of the first row [1].

# Approach
I'll use a bottom-up dynamic programming approach to build the triangle row by row:

1. **Initialize**: Start with the triangle containing just the first row [1].

2. **Row Construction**: For each subsequent row from 1 to numRows-1:
   - Start each new row with 1 (left edge of triangle)
   - For positions 1 to prevRow.length-1, calculate each element as the sum of the two elements above it from the previous row
   - End each row with 1 (right edge of triangle)

3. **Build Incrementally**: Each row depends only on the immediately previous row, so we can build the triangle incrementally without needing to recalculate earlier rows.

The key insight is that row i has i+1 elements, and for any interior position j in row i, the value is triangle[i-1][j-1] + triangle[i-1][j].

# Complexity
- Time complexity: $$O(n^2)$$
  - We generate n rows, where row i has i+1 elements
  - Total elements = 1 + 2 + 3 + ... + n = n(n+1)/2 = O(n²)
  - Each element is calculated in constant time

- Space complexity: $$O(n^2)$$
  - The output triangle contains O(n²) total elements
  - No additional space beyond the result is needed

# Code
```typescript []
const generate = (numRows: number): number[][] => {
    const triangle: number[][] = [[1]];

    for (let row = 1; row < numRows; row++) {
        const prevRow = triangle[row - 1];
        const newRow = [1];

        for (let i = 1; i < prevRow.length; i++) {
            newRow.push(prevRow[i - 1] + prevRow[i]);
        }

        newRow.push(1);
        triangle.push(newRow);
    }

    return triangle;
};
```