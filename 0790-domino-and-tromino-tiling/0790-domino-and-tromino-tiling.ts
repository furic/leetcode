const numTilings = (n: number): number => {
    const MOD = 1e9 + 7;

    // dp[i] will store the number of ways to tile a 2 x i board
    const dp = new Array<number>(n + 1).fill(0);

    // Base cases
    dp[0] = 1; // One way to tile an empty board (do nothing)
    dp[1] = 1; // Only one vertical domino fits
    dp[2] = 2; // Two vertical dominoes, or two horizontal dominoes, or one tromino

    // Fill dp array using recurrence relation
    for (let i = 3; i <= n; i++) {
        // The recurrence:
        // dp[i - 1] → add a vertical domino to all dp[i - 1] configurations
        // dp[i - 2] → add two horizontal dominoes or a tromino
        // dp[i - 3] → add trominoes that span three columns (L-shapes in either orientation)
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
    }

    return dp[n];
};