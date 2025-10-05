function pacificAtlantic(heights: number[][]): number[][] {
    if (!heights || heights.length === 0) return [];

    const m = heights.length, n = heights[0].length;
    const pacific: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const atlantic: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const dirs: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const dfs = (r: number, c: number, visited: boolean[][]) => {
        visited[r][c] = true;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < m && nc >= 0 && nc < n &&
                !visited[nr][nc] && heights[nr][nc] >= heights[r][c]
            ) {
                dfs(nr, nc, visited);
            }
        }
    };

    for (let i = 0; i < m; i++) {
        dfs(i, 0, pacific);
        dfs(i, n - 1, atlantic);
    }
    for (let j = 0; j < n; j++) {
        dfs(0, j, pacific);
        dfs(m - 1, j, atlantic);
    }

    const res: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pacific[i][j] && atlantic[i][j]) res.push([i, j]);
        }
    }
    return res;
};