const minAbsDiff = (grid: number[][], k: number): number[][] => {
    const m = grid.length;
    const n = grid[0].length;
    const ans: number[][] = [];

    for (let i = 0; i <= m - k; i++) {
        const row: number[] = [];
        for (let j = 0; j <= n - k; j++) {
            const values: number[] = [];
            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    values.push(grid[x][y]);
                }
            }

            const unique = Array.from(new Set(values)).sort((a, b) => a - b);

            let minDiff = Infinity;
            for (let z = 1; z < unique.length; z++) {
                minDiff = Math.min(minDiff, unique[z] - unique[z - 1]);
            }

            row.push(unique.length === 1 ? 0 : minDiff);
        }
        ans.push(row);
    }

    return ans;
};