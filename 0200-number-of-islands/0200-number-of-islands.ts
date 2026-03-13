function numIslands(grid: string[][]): number {
    function dfs(r, c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
            return;
        }
        if (grid[r][c] === "0") {
            return;
        }
        grid[r][c] = "0";
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    }
    let res = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "1") {
                res++;
                dfs(i, j);
            }
        }
    }
    return res;
};