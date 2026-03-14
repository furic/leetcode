const orangesRotting = (grid: number[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const rowQueue: number[] = [];
    const colQueue: number[] = [];
    const timeQueue: number[] = [];

    let freshCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) freshCount++;
            else if (grid[r][c] === 2) {
                rowQueue.push(r);
                colQueue.push(c);
                timeQueue.push(0);
            }
        }
    }

    let head = 0;
    let elapsedTime = 0;

    while (head < timeQueue.length) {
        const r = rowQueue[head];
        const c = colQueue[head];
        elapsedTime = timeQueue[head];
        head++;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;
                rowQueue.push(nr);
                colQueue.push(nc);
                timeQueue.push(elapsedTime + 1);
                freshCount--;
            }
        }
    }

    return freshCount === 0 ? elapsedTime : -1;
};