# Dual DFS from Borders | 63 Lines | O(m × n) | 21ms

# Intuition
Water flows from higher or equal elevation to lower elevation. Instead of checking if each cell can reach both oceans by flowing downward, we can reverse the problem: start from the ocean borders and flow upward (to cells with equal or higher elevation) to mark all cells that can reach each ocean.

# Approach
**Reverse Flow Strategy:**
- Rather than simulating water flowing down from each cell, start from the ocean borders and work inward
- A cell can reach an ocean if we can trace a path of non-decreasing heights from that ocean to the cell
- Run DFS from Pacific borders (top and left edges) and Atlantic borders (bottom and right edges)

**Step-by-Step Process:**

1. **Initialize Tracking Arrays:**
   - Create two boolean matrices: `reachesPacific` and `reachesAtlantic`
   - These track which cells can flow to each respective ocean

2. **DFS from Pacific Borders:**
   - Start DFS from all cells on the top row (row 0)
   - Start DFS from all cells on the left column (col 0)
   - Mark all reachable cells in `reachesPacific`

3. **DFS from Atlantic Borders:**
   - Start DFS from all cells on the bottom row (row m-1)
   - Start DFS from all cells on the right column (col n-1)
   - Mark all reachable cells in `reachesAtlantic`

4. **DFS Logic (Reverse Flow):**
   - From current cell, explore all 4 neighbors
   - A neighbor is reachable if:
     - It's within bounds
     - It hasn't been visited yet for this ocean
     - Its height ≥ current cell's height (water can flow from neighbor to current)
   - Recursively mark the neighbor and continue DFS

5. **Find Intersection:**
   - Iterate through all cells
   - Collect cells where both `reachesPacific[row][col]` and `reachesAtlantic[row][col]` are true
   - These cells can reach both oceans

**Why This Works:**
- If we can reach cell (r,c) from Pacific by following non-decreasing heights, then water can flow from (r,c) to Pacific by following non-increasing heights
- The same logic applies for Atlantic
- By doing DFS from both oceans, we avoid redundant path checking for each cell

# Complexity
- Time complexity: $$O(m \times n)$$ where m and n are grid dimensions - each cell is visited at most twice (once per ocean)
- Space complexity: $$O(m \times n)$$ for the two tracking matrices and recursion stack

# Code
```typescript
const pacificAtlantic = (heights: number[][]): number[][] => {
    if (!heights || heights.length === 0) return [];

    const rows = heights.length;
    const cols = heights[0].length;
    
    const reachesPacific: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );
    const reachesAtlantic: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );
    
    const directions: number[][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    const markReachableCells = (row: number, col: number, canReachOcean: boolean[][]): void => {
        canReachOcean[row][col] = true;
        
        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            
            if (
                neighborRow >= 0 && neighborRow < rows && 
                neighborCol >= 0 && neighborCol < cols &&
                !canReachOcean[neighborRow][neighborCol] && 
                heights[neighborRow][neighborCol] >= heights[row][col]
            ) {
                markReachableCells(neighborRow, neighborCol, canReachOcean);
            }
        }
    };

    for (let row = 0; row < rows; row++) {
        markReachableCells(row, 0, reachesPacific);
    }
    for (let col = 0; col < cols; col++) {
        markReachableCells(0, col, reachesPacific);
    }

    for (let row = 0; row < rows; row++) {
        markReachableCells(row, cols - 1, reachesAtlantic);
    }
    for (let col = 0; col < cols; col++) {
        markReachableCells(rows - 1, col, reachesAtlantic);
    }

    const result: number[][] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (reachesPacific[row][col] && reachesAtlantic[row][col]) {
                result.push([row, col]);
            }
        }
    }
    
    return result;
};
```