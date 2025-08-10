const reverseSubmatrix = (
    grid: number[][],
    x: number,
    y: number,
    k: number
): number[][] => {
    for (let i = 0; i < k; i++) {
        const [row1, row2] = [x + i, x + k - 1 - i];
        if (row1 >= row2) {
            break;
        }
        for (let j = 0; j < k; j++) {
            [grid[row1][y + j], grid[row2][y + j]] = [
                grid[row2][y + j],
                grid[row1][y + j],
            ];
        }
    }
    return grid;
};
