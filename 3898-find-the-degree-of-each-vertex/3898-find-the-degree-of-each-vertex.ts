const findDegrees = (matrix: number[][]): number[] =>
    matrix.map((row) => row.reduce((sum, v) => sum + v, 0));