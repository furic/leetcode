const setZeroes = (matrix: number[][]): void => {
    const rowsToZero = new Set<number>();
    const colsToZero = new Set<number>();

    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    // Step 1: Identify all rows and columns that should be zeroed
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (matrix[row][col] === 0) {
                rowsToZero.add(row);
                colsToZero.add(col);
            }
        }
    }

    // Step 2: Zero out the necessary rows and columns
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (rowsToZero.has(row) || colsToZero.has(col)) {
                matrix[row][col] = 0;
            }
        }
    }
};