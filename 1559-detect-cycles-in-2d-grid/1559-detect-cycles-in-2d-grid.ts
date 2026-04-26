const containsCycle = (grid: string[][]): boolean => {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const dfs = (r: number, c: number, prevR: number, prevC: number): boolean => {
        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                grid[nr][nc] === grid[r][c] &&
                !(nr === prevR && nc === prevC)
            ) {
                if (visited[nr][nc] || dfs(nr, nc, r, c)) return true;
            }
        }

        return false;
    };

    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (!visited[r][c] && dfs(r, c, -1, -1)) return true;

    return false;
};