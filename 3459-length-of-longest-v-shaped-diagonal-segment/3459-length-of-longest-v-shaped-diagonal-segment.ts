function lenOfVDiagonal(grid: number[][]): number {
    const DIRS = [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
    ];
    const m = grid.length,
        n = grid[0].length;
    const memo: number[] = new Array(m * n * 8).fill(-1);

    function dfs(
        cx: number,
        cy: number,
        direction: number,
        turn: boolean,
        target: number,
    ): number {
        const nx = cx + DIRS[direction][0];
        const ny = cy + DIRS[direction][1];
        /* If it goes beyond the boundary or the next node's value is not the target
         * value, then return */
        if (nx < 0 || ny < 0 || nx >= m || ny >= n || grid[nx][ny] !== target) {
            return 0;
        }

        const turnInt = turn ? 1 : 0;
        const index = nx * n * 8 + ny * 8 + direction * 2 + turnInt;
        if (memo[index] !== -1) {
            return memo[index];
        }

        /* Continue walking in the original direction. */
        let maxStep = dfs(nx, ny, direction, turn, 2 - target);
        if (turn) {
            /* Clockwise rotate 90 degrees turn */
            maxStep = Math.max(
                maxStep,
                dfs(nx, ny, (direction + 1) % 4, false, 2 - target),
            );
        }
        memo[index] = maxStep + 1;
        return maxStep + 1;
    }

    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                for (let direction = 0; direction < 4; direction++) {
                    res = Math.max(res, dfs(i, j, direction, true, 2) + 1);
                }
            }
        }
    }
    return res;
};