# In-Place Row Swapping | 12 Lines | O(k²) | 1ms

# Intuition
To flip a square submatrix vertically, we need to reverse the order of its rows. This means the first row of the submatrix becomes the last row, the second row becomes the second-to-last row, and so on. The most efficient approach is to swap rows in pairs from the outside toward the center, avoiding the need to create a new matrix or temporary storage for entire rows.

# Approach
I'll use an in-place row swapping technique:

1. **Identify Submatrix Boundaries**: The submatrix starts at position (x, y) and has dimensions k×k.

2. **Pair-wise Row Swapping**: For each pair of rows that need to be swapped:
   - First row of submatrix (row x+i) swaps with last row (row x+k-1-i)
   - Second row (row x+i+1) swaps with second-to-last row (row x+k-2-i)
   - Continue until we reach the middle

3. **Element-wise Swapping**: For each pair of rows, swap corresponding elements column by column within the submatrix bounds (from column y to y+k-1).

4. **Early Termination**: Stop when row1 >= row2, which happens when we've processed all necessary pairs (for both even and odd k values).

5. **In-place Operations**: Use destructuring assignment to swap elements efficiently without temporary variables.

This approach modifies the original grid directly, making it memory-efficient while maintaining clarity.

# Complexity
- Time complexity: $$O(k^2)$$
  - We process k/2 pairs of rows (outer loop runs k/2 times)
  - For each pair, we swap k elements (inner loop runs k times)
  - Total operations: (k/2) × k = O(k²)

- Space complexity: $$O(1)$$
  - We perform all operations in-place on the original grid
  - Only use a constant amount of extra variables for indices and temporary swapping
  - No additional data structures that scale with input size

# Code
```typescript []
const reverseSubmatrix = (
    grid: number[][],
    x: number,
    y: number,
    k: number
): number[][] => {
    for (let i = 0; i < k; i++) {
        const [row1, row2] = [x + i, x + k - 1 - i];
        if (row1 >= row2) {
            break;
        }
        for (let j = 0; j < k; j++) {
            [grid[row1][y + j], grid[row2][y + j]] = [
                grid[row2][y + j],
                grid[row1][y + j],
            ];
        }
    }
    return grid;
};
```