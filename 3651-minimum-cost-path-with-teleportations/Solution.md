# DP with Teleport Optimization | 95 Lines | O(k × mn log(mn)) | 636ms

# Intuition

Use DP with k+1 iterations where each iteration allows one teleport. Alternate between normal moves (right/down) and teleportation optimization. Teleportation to cells with smaller/equal values is modeled by propagating minimum costs through sorted cells.

# Approach

**DP Structure:**
- `dp[i][j]` = minimum cost to reach cell (i,j)
- Initialize dp[0][0] = 0

**Two-Phase Updates:**
1. **Normal Moves**: Each cell reachable from top or left
   - `dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]`

2. **Teleportation**: Can jump to any cell with value ≤ current for free
   - Sort all cells by value
   - Forward pass: propagate min within same-value groups
   - Backward pass: propagate suffix minimum (can teleport to cheaper cells with larger values)

**Iteration Strategy:**
- Run k+1 iterations
- Each iteration: normal moves → teleport optimization
- Final iteration: only normal moves (no teleports left)

**Example: grid=[[1,3,3],[2,5,4],[4,3,5]], k=2**

Initial: dp[0][0]=0

Iteration 1 (normal):
```
0  3  6
2  7  10
6  9  14
```

Iteration 1 (teleport): sorted cells allow jumping to cheaper locations

Iteration 2: Further optimization...

Result: dp[2][2]=7 ✓

# Complexity

- Time complexity: $$O(k \times mn \log(mn))$$
  - Sort cells: O(mn log(mn)) once
  - k+1 iterations of:
    - Normal moves: O(mn)
    - Teleport optimization: O(mn)
  - Overall: O(mn log(mn) + k×mn)

- Space complexity: $$O(mn)$$
  - DP table: O(mn)
  - Sorted cells: O(mn)
  - Overall: O(mn)

# Code
```typescript []
const minCost = (grid: number[][], maxTeleports: number): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const sortedCells: [number, number, number][] = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            sortedCells.push([grid[row][col], row, col]);
        }
    }
    sortedCells.sort((a, b) => 
        a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
    );

    const minCostTo: number[][] = Array.from({ length: numRows }, 
        () => Array(numCols).fill(Infinity)
    );
    minCostTo[0][0] = 0;

    const updateWithNormalMoves = (): void => {
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (row > 0) {
                    minCostTo[row][col] = Math.min(
                        minCostTo[row][col], 
                        grid[row][col] + minCostTo[row - 1][col]
                    );
                }
                if (col > 0) {
                    minCostTo[row][col] = Math.min(
                        minCostTo[row][col], 
                        grid[row][col] + minCostTo[row][col - 1]
                    );
                }
            }
        }
    };

    const updateWithTeleportation = (): void => {
        const numCells = sortedCells.length;

        let currentValue = -1;
        let groupMinimumCost = Infinity;
        
        for (let idx = 0; idx < numCells; idx++) {
            const [cellValue, row, col] = sortedCells[idx];
            
            if (cellValue !== currentValue) {
                currentValue = cellValue;
                groupMinimumCost = minCostTo[row][col];
            } else {
                groupMinimumCost = Math.min(groupMinimumCost, minCostTo[row][col]);
                minCostTo[row][col] = Math.min(minCostTo[row][col], groupMinimumCost);
            }
        }

        const [lastValue, lastRow, lastCol] = sortedCells[numCells - 1];
        let suffixMinimum = minCostTo[lastRow][lastCol];
        
        for (let idx = numCells - 2; idx >= 0; idx--) {
            const [cellValue, row, col] = sortedCells[idx];
            const currentCost = minCostTo[row][col];
            
            if (currentCost < suffixMinimum) {
                suffixMinimum = currentCost;
            } else {
                minCostTo[row][col] = suffixMinimum;
            }
        }
    };

    for (let teleportsRemaining = maxTeleports; teleportsRemaining >= 0; teleportsRemaining--) {
        updateWithNormalMoves();
        
        if (teleportsRemaining > 0) {
            updateWithTeleportation();
        }
    }

    return minCostTo[numRows - 1][numCols - 1];
};
```