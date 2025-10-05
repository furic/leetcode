function pacificAtlantic(heights: number[][]): number[][] {
    
    const m: number = heights.length, n: number = heights[0].length;
    const pac: boolean[][] = Array.from({length: m}, () => Array(n).fill(false));
    for (let i = 0; i < m; i++) dfs(i, 0, 0, pac);
    for (let i = 0; i < n; i++) dfs(0, i, 0, pac);

    const atl: boolean[][] = Array.from({length: m}, () => Array(n).fill(false));
    for (let i = 0; i < m; i++) dfs(i, n - 1, 0, atl);
    for (let i = 0; i < n; i++) dfs(m - 1, i, 0, atl);

    function dfs(x: number, y: number, prev: number, visited: boolean[][]): void {
        if (x < 0 || y < 0 || x >= m || y >= n) return;
        if (prev > heights[x][y]) return;
        if (visited[x][y]) return;
        visited[x][y] = true;

        dfs(x - 1, y, heights[x][y], visited);
        dfs(x + 1, y, heights[x][y], visited);
        dfs(x, y - 1, heights[x][y], visited);
        dfs(x, y + 1, heights[x][y], visited);
    }

    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pac[i][j] && atl[i][j]) result.push([i, j]);
        }
    }
    return result;
};