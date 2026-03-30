const minCost = (grid: number[][]): number => {
    const m = grid.length;
    const n = grid[0].length;
    const MAX_XOR = 1024;

    const dp: boolean[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Array<boolean>(MAX_XOR).fill(false))
    );

    dp[0][0][grid[0][0]] = true;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const cell = grid[row][col];
            for (let xorVal = 0; xorVal < MAX_XOR; xorVal++) {
                if (!dp[row][col][xorVal]) continue;

                if (col + 1 < n) dp[row][col + 1][xorVal ^ grid[row][col + 1]] = true;
                if (row + 1 < m) dp[row + 1][col][xorVal ^ grid[row + 1][col]] = true;
            }
        }
    }

    const dest = dp[m - 1][n - 1];
    for (let xorVal = 0; xorVal < MAX_XOR; xorVal++) {
        if (dest[xorVal]) return xorVal;
    }
    return -1;
};