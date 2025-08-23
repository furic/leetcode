function minimumSum(grid: number[][]): number {
    const rgrid = rotate(grid);
    return Math.min(solve(grid), solve(rgrid));
}

function minimumSum2(
    grid: number[][],
    u: number,
    d: number,
    l: number,
    r: number,
): number {
    let min_i = grid.length,
        max_i = 0;
    let min_j = grid[0].length,
        max_j = 0;
    for (let i = u; i <= d; i++) {
        for (let j = l; j <= r; j++) {
            if (grid[i][j] === 1) {
                min_i = Math.min(min_i, i);
                min_j = Math.min(min_j, j);
                max_i = Math.max(max_i, i);
                max_j = Math.max(max_j, j);
            }
        }
    }
    return min_i <= max_i
        ? (max_i - min_i + 1) * (max_j - min_j + 1)
        : Number.MAX_SAFE_INTEGER / 3;
}

function rotate(vec: number[][]): number[][] {
    const n = vec.length,
        m = vec[0].length;
    const ret: number[][] = new Array(m).fill(0).map(() => new Array(n));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            ret[m - j - 1][i] = vec[i][j];
        }
    }
    return ret;
}

function solve(grid: number[][]): number {
    const n = grid.length,
        m = grid[0].length;
    let res = n * m;
    for (let i = 0; i + 1 < n; i++) {
        for (let j = 0; j + 1 < m; j++) {
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, m - 1) +
                    minimumSum2(grid, i + 1, n - 1, 0, j) +
                    minimumSum2(grid, i + 1, n - 1, j + 1, m - 1),
            );
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, j) +
                    minimumSum2(grid, 0, i, j + 1, m - 1) +
                    minimumSum2(grid, i + 1, n - 1, 0, m - 1),
            );
        }
    }
    for (let i = 0; i + 2 < n; i++) {
        for (let j = i + 1; j + 1 < n; j++) {
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, m - 1) +
                    minimumSum2(grid, i + 1, j, 0, m - 1) +
                    minimumSum2(grid, j + 1, n - 1, 0, m - 1),
            );
        }
    }
    return res;
}