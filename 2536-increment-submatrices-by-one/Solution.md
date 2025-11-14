# 2D Difference Array | 25 Lines | O(n²) | 46ms

# Intuition
Instead of naively adding 1 to every cell in each query range (which would be O(n² × q)), we can use a 2D difference array to mark only the boundaries of rectangles, then compute the actual values in one pass using 2D prefix sum.

# Approach
- **Initialize Difference Array**:
  - Create an (n+1) × (n+1) difference array (extra row/column for boundary handling)
  - Initially filled with zeros
  - The extra dimension prevents index out of bounds when marking rectangle boundaries

- **Mark Rectangle Boundaries** (for each query):
  - For rectangle from (row1, col1) to (row2, col2), apply four updates:
  - `diffArray[row1][col1] += 1`: Mark top-left corner (start of rectangle effect)
  - `diffArray[row2+1][col1] -= 1`: Cancel effect below the rectangle
  - `diffArray[row1][col2+1] -= 1`: Cancel effect to the right of rectangle
  - `diffArray[row2+1][col2+1] += 1`: Re-add corner (inclusion-exclusion principle)
  - This ensures the +1 effect only applies within the rectangle bounds

- **Why This Pattern Works**:
  - When we compute prefix sums, the +1 at (row1, col1) propagates to all cells below and to the right
  - The -1 markers stop this propagation at the rectangle boundaries
  - The +1 at bottom-right corner corrects for double-subtraction in the overlap region

- **Compute 2D Prefix Sum**:
  - Create result matrix of size n × n
  - For each cell (row, col), apply 2D prefix sum formula:
  - `result[row][col] = diff[row][col] + top + left - topLeft`
  - Top: value from cell above (`result[row-1][col]`)
  - Left: value from cell to the left (`result[row][col-1]`)
  - TopLeft: value from diagonal cell (`result[row-1][col-1]`)
  - Subtract topLeft because it's counted twice (once in top, once in left)

- **Handle Boundary Cases**:
  - When row = 0 or col = 0, treat missing neighbors as 0
  - This avoids array index errors at edges

- **Time Efficiency**:
  - Each query: O(1) - only 4 array updates
  - All queries: O(q) where q is number of queries
  - Prefix sum computation: O(n²) - visit each cell once
  - Total: O(q + n²)

# Complexity
- Time complexity: $$O(q + n^2)$$
  - O(q) for processing all queries (4 operations each)
  - O(n²) for computing 2D prefix sum over the matrix

- Space complexity: $$O(n^2)$$
  - Difference array: (n+1) × (n+1) = O(n²)
  - Result matrix: n × n = O(n²)
  - Total auxiliary space: O(n²)

# Code
```typescript
const rangeAddQueries = (n: number, queries: number[][]): number[][] => {
    const diffArray: number[][] = Array.from(
        { length: n + 1 }, 
        () => Array(n + 1).fill(0)
    );

    for (const [row1, col1, row2, col2] of queries) {
        diffArray[row1][col1] += 1;
        diffArray[row2 + 1][col1] -= 1;
        diffArray[row1][col2 + 1] -= 1;
        diffArray[row2 + 1][col2 + 1] += 1;
    }

    const resultMatrix: number[][] = Array.from(
        { length: n }, 
        () => Array(n).fill(0)
    );

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const topValue = row === 0 ? 0 : resultMatrix[row - 1][col];
            const leftValue = col === 0 ? 0 : resultMatrix[row][col - 1];
            const topLeftValue = (row === 0 || col === 0) ? 0 : resultMatrix[row - 1][col - 1];
            
            resultMatrix[row][col] = diffArray[row][col] + topValue + leftValue - topLeftValue;
        }
    }

    return resultMatrix;
};
```