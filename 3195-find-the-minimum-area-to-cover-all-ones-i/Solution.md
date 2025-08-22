# Bounding Box Calculation | 15 Lines | O(mn) | 104ms

# Intuition
To find the smallest rectangle that contains all 1s, we need to determine the bounding box of all 1s in the grid. This means finding the topmost, bottommost, leftmost, and rightmost positions where 1s appear. Once we have these boundaries, the minimum rectangle is simply the area enclosed by these extreme points.

# Approach
I'll use a single-pass bounding box calculation:

1. **Initialize Boundaries**: Set initial values for the four boundaries:
   - Top and left boundaries to maximum possible values (grid dimensions)
   - Bottom and right boundaries to minimum possible values (-1)

2. **Single Grid Traversal**: Scan through every cell in the grid once. When we encounter a 1:
   - Update topmost row: minimum row index seen so far
   - Update bottommost row: maximum row index seen so far  
   - Update leftmost column: minimum column index seen so far
   - Update rightmost column: maximum column index seen so far

3. **Calculate Dimensions**: After finding all boundaries:
   - Height = bottommost row - topmost row + 1
   - Width = rightmost column - leftmost column + 1

4. **Return Area**: Multiply height × width to get the minimum rectangle area.

This approach guarantees the smallest possible rectangle because we're finding the exact bounding box of all 1s.

# Complexity
- Time complexity: $$O(mn)$$
  - We visit every cell in the m×n grid exactly once
  - Each cell is processed in constant time with simple min/max operations
  - No nested loops beyond the grid traversal itself

- Space complexity: $$O(1)$$
  - Only using four variables to track boundaries regardless of grid size
  - No additional data structures that scale with the input
  - All computations done with constant extra space

# Code
```typescript []
const minimumArea = (grid: number[][]): number => {
    const totalRows = grid.length;
    const totalColumns = grid[0].length;
    
    let topMostRow = totalRows;
    let bottomMostRow = -1;
    let leftMostColumn = totalColumns;
    let rightMostColumn = -1;

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            if (grid[rowIndex][columnIndex] === 1) {
                topMostRow = Math.min(topMostRow, rowIndex);
                bottomMostRow = Math.max(bottomMostRow, rowIndex);
                leftMostColumn = Math.min(leftMostColumn, columnIndex);
                rightMostColumn = Math.max(rightMostColumn, columnIndex);
            }
        }
    }

    const rectangleHeight = bottomMostRow - topMostRow + 1;
    const rectangleWidth = rightMostColumn - leftMostColumn + 1;
    
    return rectangleHeight * rectangleWidth;
};
```