function shiftGrid(grid: number[][], k: number): number[][] {
    const n = grid.length;
    const m = grid[0].length;

    const res: number[][] = Array.from(
        { length: n },
        () => Array(m).fill(0)
    );

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const newJ = (j + k) % m;
            const newI = (i + Math.floor((j + k) / m)) % n;

            res[newI][newJ] = grid[i][j];
        }
    }

    return res;
}