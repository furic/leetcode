const spiralOrder = (matrix: number[][]): number[] => {
    const result: number[] = [];
    while (matrix.length > 0 && matrix[0][0] !== undefined) {
        // Steal the first row
        result.push(...matrix.shift());
        // Steal the right column
        matrix.forEach(row => result.push(row.pop()));
        // Turn the matrix over
        matrix.reverse().map(row => row.reverse());
    }
    return result;
};