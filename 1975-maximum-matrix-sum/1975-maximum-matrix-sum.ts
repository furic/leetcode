function maxMatrixSum(matrix: number[][]): number {
    let sum = 0, n = matrix.length, min = Infinity;
    let negative = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sum += Math.abs(matrix[i][j]);
            if (matrix[i][j] < 0) negative++;
            min = Math.min(min, Math.abs(matrix[i][j]));
        }
    }

    if (negative % 2 !== 0) sum -= 2 * min;

    return sum;
};