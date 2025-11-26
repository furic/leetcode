function numberOfPaths(grid: number[][], k: number) {
    const M = grid.length, N = grid[0].length, MOD = 1e9 + 7;
    const dp: number[][][] = Array.from(
        { length: M + 1 },
        () => Array.from({ length: N + 1 }, () => new Array(k).fill(0)),
    );
    dp[1][1][grid[0][0] % k] = 1;
    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            if (i > 1 || j > 1) {
                for (let r = 0, val = grid[i - 1][j - 1] % k; r < k; r++) {
                    const prev = (r - val + k) % k;
                    dp[i][j][r] = (dp[i - 1][j][prev] + dp[i][j - 1][prev]) % MOD;
                }
            }
        }
    }
    return dp[M][N][0];
}