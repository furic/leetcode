function swimInWater(grid: number[][]): number {
    const [rows, cols] = [grid.length, grid[0].length];
    const directions: number[][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let heap = new MinPriorityQueue<[number, number, number]>((el) => el[0]);
    heap.enqueue([grid[0][0], 0, 0]);
    let visited: Set<string> = new Set<string>();
    while ( heap.size() > 0 ) {
        const [time, row, col] = heap.dequeue();
        visited.add(row + ',' + col);
        if ( row === rows - 1 && col === cols - 1 ) return time;
        for ( const [ar, ac] of directions ) {
            const [nr, nc] = [ar + row, ac + col];
            if ( nr < 0 || nc < 0 || nr >= rows || nc >= cols || visited.has(nr + ',' + nc) ) continue;
            heap.enqueue([Math.max(time, grid[nr][nc]), nr, nc]);
        }
    }
    return -1;
};