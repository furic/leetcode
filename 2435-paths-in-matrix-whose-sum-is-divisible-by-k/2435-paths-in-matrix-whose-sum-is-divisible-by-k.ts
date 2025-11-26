/**
 * Counts paths from top-left to bottom-right where path sum is divisible by k
 * Uses space-optimized DP: tracks path counts by their sum's remainder mod k
 * dp[col][remainder] = number of ways to reach that column with that remainder
 */
const numberOfPaths = (grid: number[][], k: number): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const MOD = 1e9 + 7;

    // Initialize DP array for previous row: pathsByRemainder[col][remainder] = count
    let previousRowPaths = Array.from({ length: numCols }, () => new Array(k).fill(0));

    for (let row = 0; row < numRows; row++) {
        const currentRowPaths = Array.from({ length: numCols }, () => new Array(k).fill(0));

        for (let col = 0; col < numCols; col++) {
            // Base case: starting cell
            if (row === 0 && col === 0) {
                const startingRemainder = grid[0][0] % k;
                currentRowPaths[col][startingRemainder] = 1;
                continue;
            }

            const cellRemainder = grid[row][col] % k;

            // Add paths coming from above (previous row, same column)
            if (row > 0) {
                for (let remainder = 0; remainder < k; remainder++) {
                    const pathCount = previousRowPaths[col][remainder];
                    if (pathCount === 0) continue;

                    const newRemainder = (remainder + cellRemainder) % k;
                    currentRowPaths[col][newRemainder] = (currentRowPaths[col][newRemainder] + pathCount) % MOD;
                }
            }

            // Add paths coming from the left (current row, previous column)
            if (col > 0) {
                for (let remainder = 0; remainder < k; remainder++) {
                    const pathCount = currentRowPaths[col - 1][remainder];
                    if (pathCount === 0) continue;

                    const newRemainder = (remainder + cellRemainder) % k;
                    currentRowPaths[col][newRemainder] = (currentRowPaths[col][newRemainder] + pathCount) % MOD;
                }
            }
        }

        previousRowPaths = currentRowPaths;
    }

    // Return count of paths where sum has remainder 0 (divisible by k)
    return previousRowPaths[numCols - 1][0];
};