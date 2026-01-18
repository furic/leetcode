/**
 * Finds the largest magic square within a grid
 * A magic square has equal sums for all rows, columns, and both diagonals
 * Strategy: Use prefix sums for O(1) range queries, check squares from largest to smallest
 */
const largestMagicSquare = (grid: number[][]): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    
    // Prefix sum arrays (1-indexed for cleaner boundary handling)
    // rowPrefixSum[i][j] = sum of grid[i-1][0..j-1]
    const rowPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    // colPrefixSum[i][j] = sum of grid[0..i-1][j-1]
    const colPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    // diagPrefixSum[i][j] = sum along diagonal from top-left to position (i-1, j-1)
    const diagPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    // antiDiagPrefixSum[i][j] = sum along anti-diagonal from top-right to position (i-1, j-1)
    const antiDiagPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));

    // Build prefix sum arrays
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cellValue = grid[row][col];
            
            // Row prefix sum: extend previous sum in same row
            rowPrefixSum[row + 1][col + 1] = rowPrefixSum[row + 1][col] + cellValue;
            
            // Column prefix sum: extend previous sum in same column
            colPrefixSum[row + 1][col + 1] = colPrefixSum[row][col + 1] + cellValue;
            
            // Diagonal prefix sum: extend previous diagonal sum
            diagPrefixSum[row + 1][col + 1] = diagPrefixSum[row][col] + cellValue;
            
            // Anti-diagonal prefix sum: extend previous anti-diagonal sum
            antiDiagPrefixSum[row + 1][col] = antiDiagPrefixSum[row][col + 1] + cellValue;
        }
    }

    /**
     * Checks if any k×k square in the grid is a magic square
     * @param squareSize - side length of squares to check
     * @returns true if a magic square of this size exists
     */
    const hasMagicSquare = (squareSize: number): boolean => {
        // Try all possible top-left corners for k×k squares
        for (let topRow = 0; topRow <= numRows - squareSize; topRow++) {
            for (let leftCol = 0; leftCol <= numCols - squareSize; leftCol++) {
                // Calculate main diagonal sum using prefix sum
                const mainDiagSum = diagPrefixSum[topRow + squareSize][leftCol + squareSize] 
                                   - diagPrefixSum[topRow][leftCol];
                
                // Calculate anti-diagonal sum using prefix sum
                const antiDiagSum = antiDiagPrefixSum[topRow + squareSize][leftCol] 
                                   - antiDiagPrefixSum[topRow][leftCol + squareSize];
                
                // Quick check: if diagonals don't match, skip this square
                if (mainDiagSum !== antiDiagSum) {
                    continue;
                }
                
                const targetSum = mainDiagSum;
                let isValid = true;
                
                // Check all rows and columns have the same sum
                for (let offset = 0; offset < squareSize; offset++) {
                    // Calculate sum of row at (topRow + offset)
                    const rowSum = rowPrefixSum[topRow + offset + 1][leftCol + squareSize] 
                                  - rowPrefixSum[topRow + offset + 1][leftCol];
                    
                    // Calculate sum of column at (leftCol + offset)
                    const colSum = colPrefixSum[topRow + squareSize][leftCol + offset + 1] 
                                  - colPrefixSum[topRow][leftCol + offset + 1];
                    
                    // If any row or column doesn't match target, not a magic square
                    if (rowSum !== targetSum || colSum !== targetSum) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    return true;
                }
            }
        }
        
        return false;
    };

    // Check from largest possible square down to 2×2
    // (1×1 is trivially magic, so we return 1 if nothing larger found)
    for (let squareSize = Math.min(numRows, numCols); squareSize >= 2; squareSize--) {
        if (hasMagicSquare(squareSize)) {
            return squareSize;
        }
    }
    
    // No magic square found, return 1 (trivial 1×1 case)
    return 1;
};