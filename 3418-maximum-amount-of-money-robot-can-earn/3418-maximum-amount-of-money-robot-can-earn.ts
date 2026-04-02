const maximumAmount = (coins: number[][]): number => {
    const cols = coins[0].length;

    // dp[col][skips] = best coins at this column having used `skips` neutralizations (0, 1, or 2)
    const dp: number[][] = Array.from({ length: cols + 1 }, () =>
        Array(3).fill(-Infinity)
    );
    dp[1][0] = dp[1][1] = dp[1][2] = 0;

    for (const row of coins) {
        for (let col = 1; col <= cols; col++) {
            const cell = row[col - 1];

            // Must be computed highest-skips first — each level reads the old value of the level below
            dp[col][2] = Math.max(
                dp[col - 1][2] + cell,
                dp[col][2]     + cell,
                dp[col - 1][1],       // skip this cell (came from left)
                dp[col][1],           // skip this cell (came from above)
            );
            dp[col][1] = Math.max(
                dp[col - 1][1] + cell,
                dp[col][1]     + cell,
                dp[col - 1][0],       // skip this cell (came from left)
                dp[col][0],           // skip this cell (came from above)
            );
            dp[col][0] = Math.max(dp[col - 1][0], dp[col][0]) + cell;
        }
    }

    return dp[cols][2];
};