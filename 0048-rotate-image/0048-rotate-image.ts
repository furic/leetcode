/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }

    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < Math.floor(n / 2); j++) {
            [matrix[i][j], matrix[i][n - 1 - j]] =
            [matrix[i][n - 1 - j], matrix[i][j]];
        }
    }
};