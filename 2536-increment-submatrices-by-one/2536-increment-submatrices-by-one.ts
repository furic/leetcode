const rangeAddQueries = (n: number, queries: number[][]): number[][] => {
    // 2D Difference array technique
    // Size (n+1) x (n+1) to handle boundary updates without checks
    const diffArray: number[][] = Array.from(
        { length: n + 1 }, 
        () => Array(n + 1).fill(0)
    );

    // Apply each range update using 2D difference array
    // To add value to rectangle [row1, col1] to [row2, col2]:
    // +1 at top-left, -1 at boundaries to cancel out effect outside rectangle
    for (const [row1, col1, row2, col2] of queries) {
        diffArray[row1][col1] += 1;           // Start of rectangle
        diffArray[row2 + 1][col1] -= 1;       // Cancel below rectangle
        diffArray[row1][col2 + 1] -= 1;       // Cancel right of rectangle
        diffArray[row2 + 1][col2 + 1] += 1;   // Re-add bottom-right corner (inclusion-exclusion)
    }

    // Convert difference array to actual values using 2D prefix sum
    const resultMatrix: number[][] = Array.from(
        { length: n }, 
        () => Array(n).fill(0)
    );

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // 2D prefix sum formula: current = diff[i][j] + left + top - top-left
            const topValue = row === 0 ? 0 : resultMatrix[row - 1][col];
            const leftValue = col === 0 ? 0 : resultMatrix[row][col - 1];
            const topLeftValue = (row === 0 || col === 0) ? 0 : resultMatrix[row - 1][col - 1];
            
            resultMatrix[row][col] = diffArray[row][col] + topValue + leftValue - topLeftValue;
        }
    }

    return resultMatrix;
};