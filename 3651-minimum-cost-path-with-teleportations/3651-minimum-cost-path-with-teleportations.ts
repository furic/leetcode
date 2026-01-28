function normalMoveUpdate(dp: number[][], grid: number[][], m: number, n: number): void {
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i > 0) dp[i][j] = Math.min(dp[i][j], grid[i][j] + dp[i - 1][j]);
            if (j > 0) dp[i][j] = Math.min(dp[i][j], grid[i][j] + dp[i][j - 1]);
        }
    }
}

function teleportUpdate(dp: number[][], teleMap: [number, number, number][]): void {
    const ts = teleMap.length;

    let currVal = -1;
    let groupMin = Number.MAX_SAFE_INTEGER;
    for (let idx = 0; idx < ts; ++idx) {
        const [v, r, c] = teleMap[idx];
        if (v !== currVal) {
            currVal = v;
            groupMin = dp[r][c];
        } else {
            groupMin = Math.min(groupMin, dp[r][c]);
            dp[r][c] = Math.min(dp[r][c], groupMin);
        }
    }

    const [vLast, rLast, cLast] = teleMap[ts - 1];
    let suffixMin = dp[rLast][cLast];
    for (let idx = ts - 2; idx >= 0; --idx) {
        const [v2, r, c] = teleMap[idx];
        const cur = dp[r][c];
        if (cur < suffixMin) {
            suffixMin = cur;
        } else {
            dp[r][c] = suffixMin;
        }
    }
}

function minCost(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;

    const teleMap: [number, number, number][] = [];
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            teleMap.push([grid[i][j], i, j]);
        }
    }
    teleMap.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(Number.MAX_SAFE_INTEGER));
    dp[0][0] = 0;

    for (let sk = k; sk >= 0; --sk) {
        normalMoveUpdate(dp, grid, m, n);
        if (sk > 0) teleportUpdate(dp, teleMap);
    }
    return dp[m - 1][n - 1];
}