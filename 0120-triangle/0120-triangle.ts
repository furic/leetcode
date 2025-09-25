function minimumTotal(triangle: number[][]): number {
    for (let row = triangle.length - 2; row >= 0; row--) {
        for (let col = 0; col <= row; col++) {
            const belowLeft = triangle[row + 1][col];
            const belowRight = triangle[row + 1][col + 1];
            triangle[row][col] += Math.min(belowLeft, belowRight);
        }
    }
    return triangle[0][0];
}