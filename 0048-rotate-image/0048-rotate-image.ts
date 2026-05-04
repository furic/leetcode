const rotate = (matrix: number[][]): void => {
    const n = matrix.length;

    // Step 1: transpose (reflect across the main diagonal)
    for (let r = 0; r < n; r++)
        for (let c = 0; c < r; c++)
            [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];

    // Step 2: reverse each row (reflect across the vertical axis)
    for (let r = 0; r < n; r++)
        for (let c = 0; c < Math.floor(n / 2); c++)
            [matrix[r][c], matrix[r][n - 1 - c]] = [matrix[r][n - 1 - c], matrix[r][c]];
};