const maxCollectedFruits = (fruits: number[][]): number => {
    const gridSize = fruits.length;
    let totalFruitsCollected = 0;
    
    // Child 1: Collect fruits along the main diagonal (0,0) -> (n-1,n-1)
    const collectMainDiagonalFruits = (): number => {
        let diagonalSum = 0;
        for (let position = 0; position < gridSize; position++) {
            diagonalSum += fruits[position][position];
        }
        return diagonalSum;
    };
    
    // DP function to find maximum fruits for a child starting from top-right corner
    // Moving from (0, n-1) to (n-1, n-1) with moves: down-left, down, down-right
    const calculateTopRightToBottomRightPath = (): number => {
        let previousRow: number[] = Array(gridSize).fill(Number.MIN_SAFE_INTEGER);
        let currentRow: number[] = Array(gridSize).fill(Number.MIN_SAFE_INTEGER);
        
        // Initialize: child starts at top-right corner
        previousRow[gridSize - 1] = fruits[0][gridSize - 1];
        
        // Process each row from 1 to n-2 (excluding first and last row)
        for (let row = 1; row < gridSize - 1; row++) {
            // Valid column range: must be reachable and within bounds
            const minColumn = Math.max(gridSize - 1 - row, row + 1);
            const maxColumn = gridSize - 1;
            
            for (let column = minColumn; column <= maxColumn; column++) {
                let bestPreviousValue = previousRow[column]; // came from directly above
                
                // Check if can come from top-left diagonal
                if (column - 1 >= 0) {
                    bestPreviousValue = Math.max(bestPreviousValue, previousRow[column - 1]);
                }
                
                // Check if can come from top-right diagonal  
                if (column + 1 < gridSize) {
                    bestPreviousValue = Math.max(bestPreviousValue, previousRow[column + 1]);
                }
                
                currentRow[column] = bestPreviousValue + fruits[row][column];
            }
            
            // Swap arrays for next iteration
            [previousRow, currentRow] = [currentRow, previousRow];
        }
        
        // Return the value at bottom-right corner
        return previousRow[gridSize - 1];
    };
    
    // Transpose the matrix to reuse the same DP logic for the third child
    const transposeMatrix = (): void => {
        for (let row = 0; row < gridSize; row++) {
            for (let column = 0; column < row; column++) {
                [fruits[row][column], fruits[column][row]] = [fruits[column][row], fruits[row][column]];
            }
        }
    };
    
    // Main algorithm execution
    totalFruitsCollected += collectMainDiagonalFruits();
    
    // Calculate fruits collected by child starting from top-right
    totalFruitsCollected += calculateTopRightToBottomRightPath();
    
    // Transpose matrix and calculate for child starting from bottom-left  
    // (which becomes top-right after transposition)
    transposeMatrix();
    totalFruitsCollected += calculateTopRightToBottomRightPath();
    
    return totalFruitsCollected;
};