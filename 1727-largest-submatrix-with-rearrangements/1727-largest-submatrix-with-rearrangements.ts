const largestSubmatrix = (matrix: number[][]): number => {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Transform each cell into the count of consecutive 1s ending at that row in its column
    for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 1) matrix[r][c] += matrix[r - 1][c];
        }
    }

    let maxArea = 0;

    for (let r = 0; r < rows; r++) {
        // Sorting descending lets us treat the j-th tallest column as width j+1
        const colHeights = [...matrix[r]].sort((a, b) => b - a);
        for (let j = 0; j < cols; j++) {
            maxArea = Math.max(maxArea, colHeights[j] * (j + 1));
        }
    }

    return maxArea;
};