function getBiggestThree(grid: number[][]): number[] {
    const m = grid.length;
    const n = grid[0].length;

    const set: Set<number> = new Set();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            set.add(grid[i][j]);

            let k = 1;
            while (true) {

                if (i - k < 0 || i + k >= m || j - k < 0 || j + k >= n)
                    break;

                let total = 0;

                let r = i - k, c = j;
                for (let t = 0; t < k; t++)
                    total += grid[r + t][c + t];

                r = i; c = j + k;
                for (let t = 0; t < k; t++)
                    total += grid[r + t][c - t];

                r = i + k; c = j;
                for (let t = 0; t < k; t++)
                    total += grid[r - t][c - t];

                r = i; c = j - k;
                for (let t = 0; t < k; t++)
                    total += grid[r - t][c + t];

                set.add(total);
                k++;
            }
        }
    }

    return Array.from(set)
        .sort((a, b) => b - a)
        .slice(0, 3);
};