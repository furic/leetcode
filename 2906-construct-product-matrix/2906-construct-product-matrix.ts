const constructProductMatrix = (grid: number[][]): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const MOD = 12345;

    // Two-pass prefix/suffix product — same idea as productExceptSelf, but in 2D (row-major order)
    const result: number[][] = Array(rows).fill(0).map(() => Array(cols).fill(0));

    let suffixProduct = 1;
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            result[r][c] = suffixProduct;
            suffixProduct = suffixProduct * grid[r][c] % MOD;
        }
    }

    let prefixProduct = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result[r][c] = result[r][c] * prefixProduct % MOD;
            prefixProduct = prefixProduct * grid[r][c] % MOD;
        }
    }

    return result;
};