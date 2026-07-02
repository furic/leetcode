const maximumSafenessFactor = (grid: number[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const dirs = [[0, 1], [-1, 0], [0, -1], [1, 0]];

    if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) return 0;

    // BFS from all thieves simultaneously to compute min distance to any thief
    const dist: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(-1));
    const bfsQueue: [number, number][] = [];
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (grid[r][c] === 1) { dist[r][c] = 0; bfsQueue.push([r, c]); }

    for (let i = 0; i < bfsQueue.length; i++) {
        const [r, c] = bfsQueue[i];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                bfsQueue.push([nr, nc]);
            }
        }
    }

    // Dijkstra-style: maximise the minimum dist along the path (safeness factor)
    const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const heap = new MaxPriorityQueue<[number, number, number]>(([, , d]) => d);
    heap.enqueue([0, 0, dist[0][0]]);
    visited[0][0] = true;

    while (heap.size() > 0) {
        const [r, c, safeness] = heap.dequeue();
        if (r === rows - 1 && c === cols - 1) return safeness;

        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                visited[nr][nc] = true;
                heap.enqueue([nr, nc, Math.min(safeness, dist[nr][nc])]);
            }
        }
    }

    return 0;
};