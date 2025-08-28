function sortMatrix(grid: number[][]): number[][] {
    const n = grid.length;

    for (let i = 0; i < n; i++) {
        let tmp: number[] = [];
        for (let j = 0; i + j < n; j++) {
            tmp.push(grid[i + j][j]);
        }
        tmp.sort((a, b) => b - a);
        for (let j = 0; i + j < n; j++) {
            grid[i + j][j] = tmp[j];
        }
    }

    for (let j = 1; j < n; j++) {
        let tmp: number[] = [];
        for (let i = 0; j + i < n; i++) {
            tmp.push(grid[i][j + i]);
        }
        tmp.sort((a, b) => a - b);
        for (let i = 0; j + i < n; i++) {
            grid[i][j + i] = tmp[i];
        }
    }

    return grid;
};