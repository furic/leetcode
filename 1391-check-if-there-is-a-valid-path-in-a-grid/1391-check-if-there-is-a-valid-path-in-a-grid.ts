function hasValidPath(grid: number[][]): boolean {
    const rows = grid.length, cols = grid[0].length;

    const dirs = {
        1: new Set([0, 1]), 
        2: new Set([2, 3]), 
        3: new Set([0, 3]),
        4: new Set([1, 3]), 
        5: new Set([0, 2]), 
        6: new Set([1, 2])
    };

    const moves = [
        [0, -1, 0, 1], 
        [0, 1, 1, 0], 
        [-1, 0, 2, 3], 
        [1, 0, 3, 2]
    ];
                    
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    
    const queue = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        if (r === rows - 1 && c === cols - 1) 
            return true;

        for (const [dr, dc, outD, inD] of moves) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                if (dirs[grid[r][c]].has(outD) && dirs[grid[nr][nc]].has(inD)) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    return false;
};