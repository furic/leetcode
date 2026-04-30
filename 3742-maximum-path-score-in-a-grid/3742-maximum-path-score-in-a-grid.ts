function maxPathScore(grid: number[][], k: number): number {
    const m: number = grid.length;
    const n: number = grid[0].length;
    let dp: Int32Array[] = Array.from({ length: n }, () => new Int32Array(k + 1).fill(-1));

    dp[0][k] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const curr: number = grid[i][j];
            const combined: Int32Array = new Int32Array(k + 1).fill(-1);

            for (let rk = 0; rk <= k; rk++) {
                combined[rk] = Math.max(combined[rk], dp[j][rk]);
            }

            if (j > 0) {
                for (let rk = 0; rk <= k; rk++) {
                    combined[rk] = Math.max(combined[rk], dp[j - 1][rk]);
                }
            }

            if (curr !== 0) {
                dp[j].fill(-1);
                for (let rk = 1; rk <= k; rk++) {
                    if (combined[rk] !== -1) {
                        dp[j][rk - 1] = combined[rk] + curr;
                    }
                }
            } else {
                dp[j] = combined;
            }
        }
    }

    let maxVal: number = -1;
    for (let rk = 0; rk <= k; rk++) {
        maxVal = Math.max(maxVal, dp[n - 1][rk]);
    }
    return maxVal;
};