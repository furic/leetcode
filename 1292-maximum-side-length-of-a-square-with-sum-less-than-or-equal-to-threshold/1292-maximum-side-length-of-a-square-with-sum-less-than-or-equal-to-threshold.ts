/**
 * Finds maximum side length of a square with sum ≤ threshold
 * Uses 2D prefix sums for O(1) rectangle sum queries
 * Strategy: Try all positions, check square sizes incrementally from current best
 */
const maxSideLength = (mat: number[][], threshold: number): number => {
    const numRows = mat.length;
    const numCols = mat[0].length;
    
    // Build 2D prefix sum array (1-indexed for cleaner boundary handling)
    // prefixSum[i][j] = sum of all elements in rectangle from (0,0) to (i-1, j-1)
    const prefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => new Array(numCols + 1).fill(0)
    );

    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numCols; col++) {
            prefixSum[row][col] = 
                prefixSum[row - 1][col] +           // Sum above
                prefixSum[row][col - 1] -           // Sum to left
                prefixSum[row - 1][col - 1] +       // Remove double-counted overlap
                mat[row - 1][col - 1];              // Add current cell
        }
    }

    /**
     * Calculates sum of rectangle using prefix sums in O(1)
     * @param topRow - top edge (1-indexed)
     * @param leftCol - left edge (1-indexed)
     * @param bottomRow - bottom edge (1-indexed, inclusive)
     * @param rightCol - right edge (1-indexed, inclusive)
     * @returns sum of all elements in the rectangle
     */
    const getRectangleSum = (
        topRow: number,
        leftCol: number,
        bottomRow: number,
        rightCol: number
    ): number => {
        return prefixSum[bottomRow][rightCol] -
               prefixSum[topRow - 1][rightCol] -
               prefixSum[bottomRow][leftCol - 1] +
               prefixSum[topRow - 1][leftCol - 1];
    };

    const maxPossibleSize = Math.min(numRows, numCols);
    let maxValidSize = 0;
    
    // Try all possible top-left positions
    for (let topRow = 1; topRow <= numRows; topRow++) {
        for (let leftCol = 1; leftCol <= numCols; leftCol++) {
            // Optimization: start checking from (currentBest + 1) since we want maximum
            // If we find a valid square of size k, no need to check smaller sizes
            for (let sideLength = maxValidSize + 1; sideLength <= maxPossibleSize; sideLength++) {
                const bottomRow = topRow + sideLength - 1;
                const rightCol = leftCol + sideLength - 1;
                
                // Check if square fits within matrix bounds
                if (bottomRow <= numRows && rightCol <= numCols) {
                    const squareSum = getRectangleSum(topRow, leftCol, bottomRow, rightCol);
                    
                    if (squareSum <= threshold) {
                        // Found a valid larger square
                        maxValidSize = sideLength;
                    } else {
                        // Sum exceeded threshold, larger squares will also exceed
                        // (monotonicity: adding more cells only increases sum)
                        break;
                    }
                } else {
                    // Square doesn't fit in matrix, stop checking larger sizes
                    break;
                }
            }
        }
    }
    
    return maxValidSize;
};