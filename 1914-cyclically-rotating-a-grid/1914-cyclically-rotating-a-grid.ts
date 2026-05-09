function rotateGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;

    for (let layer = 0; layer < Math.min(m, n) / 2; layer++) {
        const r: number[] = [];
        const c: number[] = [];
        const val: number[] = [];

        for (let i = layer; i < m - layer - 1; i++) {
            r.push(i);
            c.push(layer);
            val.push(grid[i][layer]);
        }

        for (let j = layer; j < n - layer - 1; j++) {
            r.push(m - layer - 1);
            c.push(j);
            val.push(grid[m - layer - 1][j]);
        }

        for (let i = m - layer - 1; i > layer; i--) {
            r.push(i);
            c.push(n - layer - 1);
            val.push(grid[i][n - layer - 1]);
        }

        for (let j = n - layer - 1; j > layer; j--) {
            r.push(layer);
            c.push(j);
            val.push(grid[layer][j]);
        }

        const total = val.length;
        const kk = k % total;

        for (let i = 0; i < total; i++) {
            const idx = (i + total - kk) % total;
            grid[r[i]][c[i]] = val[idx];
        }
    }
    return grid;
};