/**
 * Calculates the minimum cost to travel from (0, 0) to (m-1, n-1) in a grid.
 * @param m The number of rows in the grid.
 * @param n The number of columns in the grid.
 * @param waitCost A 2D array where waitCost[i][j] is the cost to wait at cell (i,j).
 * @returns The minimum total cost as a number.
 */
const minCost = (m: number, n: number, waitCost: number[][]): number => {
    // The costs can become large, so we use BigInt for all calculations
    // to prevent potential integer overflow, as hinted by the prompt.
    const waitCostBigInt = waitCost.map(row => row.map(c => BigInt(c)));

    // dp[j] stores the `readyCost` for cell (i, j) of the row `i` being processed.
    // The `readyCost` is the minimum cost to arrive at a cell and complete the subsequent wait.
    const dp = new Array<bigint>(n);

    // This variable will hold the `arriveCost` of the most recently computed cell.
    // It's initialized to 1n for the base case (m=1, n=1).
    let arriveCost: bigint = 1n;
    
    // --- Base Case and First Row (i=0) ---
    // For cell (0,0), arriveCost is 1 and readyCost is 1 (no wait).
    dp[0] = 1n;

    // For the rest of row 0, you can only arrive from the left.
    for (let j = 1; j < n; j++) {
        const entryCost = BigInt(j + 1); // entryCost(0,j) = (0+1)*(j+1)
        // Arrive at (0,j) from (0,j-1). Cost is readyCost of (0,j-1) + entryCost of (0,j).
        arriveCost = dp[j-1] + entryCost;
        // The readyCost includes the waitCost at the new cell.
        dp[j] = arriveCost + waitCostBigInt[0][j];
    }

    // --- Subsequent Rows (i > 0) ---
    for (let i = 1; i < m; i++) {
        // First column cell (i, 0) can only be reached from above.
        let entryCost = BigInt(i + 1); // entryCost(i,0) = (i+1)*(0+1)
        // Cost is readyCost of (i-1,0) + entryCost of (i,0).
        arriveCost = dp[0] + entryCost;
        dp[0] = arriveCost + waitCostBigInt[i][0];

        // For the rest of the row, you can arrive from above or from the left.
        for (let j = 1; j < n; j++) {
            entryCost = BigInt(i + 1) * BigInt(j + 1);
            
            // `dp[j]` still holds readyCost from the previous row (i-1, j).
            const fromUpReady = dp[j];
            // `dp[j-1]` has been updated for the current row (i, j-1).
            const fromLeftReady = dp[j-1];
            
            const minPrevReady = fromUpReady < fromLeftReady ? fromUpReady : fromLeftReady;
            
            arriveCost = minPrevReady + entryCost;
            dp[j] = arriveCost + waitCostBigInt[i][j];
        }
    }
    
    // The last `arriveCost` calculated corresponds to the destination cell (m-1, n-1).
    // The function signature requires a `number`, so we convert the BigInt result.
    return Number(arriveCost);
};