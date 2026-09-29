const hasValidPath = (grid: string[][]): boolean => {
    const rows = grid.length, cols = grid[0].length;
    const pathLen = rows + cols - 1;

    if (pathLen % 2 === 1) return false;
    if (grid[0][0] !== '(' || grid[rows - 1][cols - 1] !== ')') return false;

    // dp[r][c] is a bitmask where bit k is set if balance k is reachable at (r, c)
    // Balance is stored shifted left by 1 so bit 0 acts as a sentinel
    const dp: bigint[][] = Array.from({ length: rows }, () => new Array(cols).fill(0n));
    dp[0][0] = 1n << 1n;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const isOpen = grid[r][c] === '(';
            if (r > 0) dp[r][c] |= isOpen ? dp[r - 1][c] << 1n : dp[r - 1][c] >> 1n;
            if (c > 0) dp[r][c] |= isOpen ? dp[r][c - 1] << 1n : dp[r][c - 1] >> 1n;
        }
    }

    return (dp[rows - 1][cols - 1] & 1n) !== 0n;
};