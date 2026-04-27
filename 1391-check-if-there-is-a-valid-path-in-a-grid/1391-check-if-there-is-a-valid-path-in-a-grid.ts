const hasValidPath = (grid: number[][]): boolean => {
    const rows = grid.length, cols = grid[0].length;

    // For each street type, the set of direction indices it connects
    // Directions: 0=left, 1=right, 2=up, 3=down
    const streetConnections: Record<number, Set<number>> = {
        1: new Set([0, 1]),
        2: new Set([2, 3]),
        3: new Set([0, 3]),
        4: new Set([1, 3]),
        5: new Set([0, 2]),
        6: new Set([1, 2]),
    };

    // [dr, dc, outDir, inDir]: movement delta and required connection on each side
    const moves = [
        [0, -1, 0, 1],  // left:  current needs 0 (left),  neighbour needs 1 (right)
        [0,  1, 1, 0],  // right: current needs 1 (right), neighbour needs 0 (left)
        [-1, 0, 2, 3],  // up:    current needs 2 (up),    neighbour needs 3 (down)
        [1,  0, 3, 2],  // down:  current needs 3 (down),  neighbour needs 2 (up)
    ];

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue: number[][] = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        if (r === rows - 1 && c === cols - 1) return true;

        for (const [dr, dc, outDir, inDir] of moves) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] &&
                streetConnections[grid[r][c]].has(outDir) &&
                streetConnections[grid[nr][nc]].has(inDir)
            ) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    return false;
};