const shiftGrid = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const total = rows * cols;

    k %= total;
    if (k === 0) return grid;

    const result: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const newIdx = (r * cols + c + k) % total;
            result[Math.floor(newIdx / cols)][newIdx % cols] = grid[r][c];
        }
    }

    return result;
};