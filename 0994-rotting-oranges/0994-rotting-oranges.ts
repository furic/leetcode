function orangesRotting(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const timeQueue: number[] = [];
    const rowQueue: number[] = [];
    const colQueue: number[] = [];

    let freshOranges = 0;
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) freshOranges++;
            else if (grid[row][col] === 2) {
                rowQueue.push(row);
                colQueue.push(col);
                timeQueue.push(0);
            }
        }
    }
    
    let head = 0, minTime = 0;
    while (head < timeQueue.length) {
        const row = rowQueue[head];
        const col = colQueue[head];
        minTime = timeQueue[head];
        head++;

        if (row > 0 && grid[row - 1][col] === 1) {
            grid[row - 1][col] = 2;
            rowQueue.push(row - 1);
            colQueue.push(col);
            timeQueue.push(minTime + 1);
            freshOranges--;
        }
        if (row < m - 1 && grid[row + 1][col] === 1) {
            grid[row + 1][col] = 2;
            rowQueue.push(row + 1);
            colQueue.push(col);
            timeQueue.push(minTime + 1);
            freshOranges--;
        }
        if (col > 0 && grid[row][col - 1] === 1) {
            grid[row][col - 1] = 2;
            rowQueue.push(row);
            colQueue.push(col - 1);
            timeQueue.push(minTime + 1);
            freshOranges--;
        }
        if (col < n - 1 && grid[row][col + 1] === 1) {
            grid[row][col + 1] = 2;
            rowQueue.push(row);
            colQueue.push(col + 1);
            timeQueue.push(minTime + 1);
            freshOranges--;
        }
    }

    return freshOranges === 0 ? minTime : -1;
};