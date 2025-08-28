# Diagonal Sorting Two Triangles | 32 Lines | O(n²logn) | 10ms 

# Intuition
The matrix can be divided into two triangular regions by the main diagonal. The bottom-left triangle (including the main diagonal) needs its diagonals sorted in descending order, while the top-right triangle needs its diagonals sorted in ascending order. Each diagonal can be identified by its starting position and processed independently by extracting elements, sorting them according to the triangle's rule, and placing them back.

# Approach
I'll process diagonals separately for each triangle:

1. **Bottom-Left Triangle Processing**:
   - Identify diagonals starting from each row of the leftmost column (including main diagonal)
   - For each diagonal starting at (startingRow, 0), extract elements moving down-right
   - Sort elements in descending order (non-increasing)
   - Place sorted elements back along the same diagonal

2. **Top-Right Triangle Processing**:
   - Identify diagonals starting from each column of the top row (excluding main diagonal)
   - For each diagonal starting at (0, startingColumn), extract elements moving down-right
   - Sort elements in ascending order (non-decreasing)
   - Place sorted elements back along the same diagonal

3. **Diagonal Traversal**:
   - Use offset-based indexing to traverse diagonals efficiently
   - For diagonal starting at (r, c), elements are at positions (r+i, c+i) for valid i

4. **In-Place Modification**: Modify the original grid directly to save space.

# Complexity
- Time complexity: $$O(n^2 \log n)$$
  - There are 2n-1 diagonals total (n in bottom-left triangle, n-1 in top-right triangle)
  - Each diagonal has at most n elements
  - Sorting each diagonal takes O(k log k) where k is diagonal length
  - Total: O(n × n log n) = O(n² log n)

- Space complexity: $$O(n)$$
  - Temporary array to store diagonal elements during sorting
  - At most n elements stored for the longest diagonal (main diagonal)
  - All operations performed in-place on the original matrix

# Code
```typescript []
const sortMatrix = (grid: number[][]): number[][] => {
    const matrixSize = grid.length;

    for (let startingRow = 0; startingRow < matrixSize; startingRow++) {
        const diagonalElements: number[] = [];
        
        for (let offset = 0; startingRow + offset < matrixSize; offset++) {
            diagonalElements.push(grid[startingRow + offset][offset]);
        }
        
        diagonalElements.sort((a, b) => b - a);
        
        for (let offset = 0; startingRow + offset < matrixSize; offset++) {
            grid[startingRow + offset][offset] = diagonalElements[offset];
        }
    }

    for (let startingColumn = 1; startingColumn < matrixSize; startingColumn++) {
        const diagonalElements: number[] = [];
        
        for (let offset = 0; startingColumn + offset < matrixSize; offset++) {
            diagonalElements.push(grid[offset][startingColumn + offset]);
        }
        
        diagonalElements.sort((a, b) => a - b);
        
        for (let offset = 0; startingColumn + offset < matrixSize; offset++) {
            grid[offset][startingColumn + offset] = diagonalElements[offset];
        }
    }

    return grid;
};
```