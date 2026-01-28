/**
 * Finds minimum cost path with teleportation ability
 * Strategy: DP with k+1 iterations, alternating between normal moves and teleport optimization
 * Teleportation allows moving to any cell with value ≤ current cell for free (up to k times)
 */
const minCost = (grid: number[][], maxTeleports: number): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Build sorted list of all cells: [cellValue, row, col]
    // Sorted by value (ascending), then by position for deterministic ordering
    const sortedCells: [number, number, number][] = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            sortedCells.push([grid[row][col], row, col]);
        }
    }
    sortedCells.sort((a, b) => 
        a[0] - b[0] ||  // Primary: sort by cell value
        a[1] - b[1] ||  // Secondary: sort by row
        a[2] - b[2]     // Tertiary: sort by col
    );

    // DP table: minCostTo[i][j] = minimum cost to reach cell (i,j)
    const minCostTo: number[][] = Array.from({ length: numRows }, 
        () => Array(numCols).fill(Number.MAX_SAFE_INTEGER)
    );
    minCostTo[0][0] = 0; // Start position has 0 cost

    /**
     * Updates DP table with normal moves (right and down)
     * Each cell can be reached from top or left + cost of entering that cell
     */
    const updateWithNormalMoves = (): void => {
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                // Move down from above
                if (row > 0) {
                    minCostTo[row][col] = Math.min(
                        minCostTo[row][col], 
                        grid[row][col] + minCostTo[row - 1][col]
                    );
                }
                // Move right from left
                if (col > 0) {
                    minCostTo[row][col] = Math.min(
                        minCostTo[row][col], 
                        grid[row][col] + minCostTo[row][col - 1]
                    );
                }
            }
        }
    };

    /**
     * Updates DP table with teleportation optimization
     * Cells can teleport to any cell with equal or smaller value for free
     * Uses two-pass algorithm on sorted cells to propagate minimum costs:
     * - Forward pass: propagate min within same-value groups
     * - Backward pass: propagate suffix minimum across all cells
     */
    const updateWithTeleportation = (): void => {
        const numCells = sortedCells.length;

        // Forward pass: within each value group, propagate minimum cost
        let currentValue = -1;
        let groupMinimumCost = Number.MAX_SAFE_INTEGER;
        
        for (let idx = 0; idx < numCells; idx++) {
            const [cellValue, row, col] = sortedCells[idx];
            
            if (cellValue !== currentValue) {
                // New value group starts
                currentValue = cellValue;
                groupMinimumCost = minCostTo[row][col];
            } else {
                // Same value group: update with group minimum
                groupMinimumCost = Math.min(groupMinimumCost, minCostTo[row][col]);
                minCostTo[row][col] = Math.min(minCostTo[row][col], groupMinimumCost);
            }
        }

        // Backward pass: propagate suffix minimum (can teleport to any smaller value)
        const [lastValue, lastRow, lastCol] = sortedCells[numCells - 1];
        let suffixMinimum = minCostTo[lastRow][lastCol];
        
        for (let idx = numCells - 2; idx >= 0; idx--) {
            const [cellValue, row, col] = sortedCells[idx];
            const currentCost = minCostTo[row][col];
            
            if (currentCost < suffixMinimum) {
                // Found new minimum
                suffixMinimum = currentCost;
            } else {
                // Can teleport to a cheaper cell with larger value
                minCostTo[row][col] = suffixMinimum;
            }
        }
    };

    // Iterate k+1 times: each iteration allows using one teleport
    for (let teleportsRemaining = maxTeleports; teleportsRemaining >= 0; teleportsRemaining--) {
        updateWithNormalMoves();
        
        // Only apply teleportation if we have teleports remaining
        if (teleportsRemaining > 0) {
            updateWithTeleportation();
        }
    }

    return minCostTo[numRows - 1][numCols - 1];
};