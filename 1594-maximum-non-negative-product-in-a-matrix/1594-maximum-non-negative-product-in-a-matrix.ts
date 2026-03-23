const maxProductPath = (grid: number[][]): number => {
    const MOD = 1_000_000_007;
    const rows = grid.length;
    const cols = grid[0].length;

    // Track both max and min products at each cell — negatives can flip sign on multiplication
    const dpMax = Array.from({ length: rows }, () => Array(cols).fill(0));
    const dpMin = Array.from({ length: rows }, () => Array(cols).fill(0));

    dpMax[0][0] = dpMin[0][0] = grid[0][0];

    for (let c = 1; c < cols; c++)
        dpMax[0][c] = dpMin[0][c] = dpMax[0][c - 1] * grid[0][c];

    for (let r = 1; r < rows; r++)
        dpMax[r][0] = dpMin[r][0] = dpMax[r - 1][0] * grid[r][0];

    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            const cell = grid[r][c];
            if (cell >= 0) {
                dpMax[r][c] = Math.max(dpMax[r - 1][c], dpMax[r][c - 1]) * cell;
                dpMin[r][c] = Math.min(dpMin[r - 1][c], dpMin[r][c - 1]) * cell;
            } else {
                dpMax[r][c] = Math.min(dpMin[r - 1][c], dpMin[r][c - 1]) * cell;
                dpMin[r][c] = Math.max(dpMax[r - 1][c], dpMax[r][c - 1]) * cell;
            }
        }
    }

    const best = dpMax[rows - 1][cols - 1];
    return best >= 0 ? best % MOD : -1;
};