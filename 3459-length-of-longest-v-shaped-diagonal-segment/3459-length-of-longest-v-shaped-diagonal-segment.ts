const lenOfVDiagonal = (grid: number[][]): number => {
    const DIAGONAL_DIRECTIONS = [
        [1, 1],   // bottom-right
        [1, -1],  // bottom-left  
        [-1, -1], // top-left
        [-1, 1],  // top-right
    ];
    
    const totalRows = grid.length;
    const totalColumns = grid[0].length;
    const memoizationTable: number[] = new Array(totalRows * totalColumns * 8).fill(-1);

    const findLongestPath = (
        currentRow: number,
        currentColumn: number,
        directionIndex: number,
        canStillTurn: boolean,
        expectedValue: number,
    ): number => {
        const nextRow = currentRow + DIAGONAL_DIRECTIONS[directionIndex][0];
        const nextColumn = currentColumn + DIAGONAL_DIRECTIONS[directionIndex][1];
        
        // Check boundaries and value match
        if (nextRow < 0 || nextColumn < 0 || nextRow >= totalRows || nextColumn >= totalColumns || 
            grid[nextRow][nextColumn] !== expectedValue) {
            return 0;
        }

        // Memoization key: position + direction + turn_status
        const turnFlag = canStillTurn ? 1 : 0;
        const memoIndex = nextRow * totalColumns * 8 + nextColumn * 8 + directionIndex * 2 + turnFlag;
        if (memoizationTable[memoIndex] !== -1) {
            return memoizationTable[memoIndex];
        }

        // Continue in same direction with alternating target (2 becomes 0, 0 becomes 2)
        let maxPathLength = findLongestPath(nextRow, nextColumn, directionIndex, canStillTurn, 2 - expectedValue);
        
        // If turn is still available, try clockwise 90-degree turn
        if (canStillTurn) {
            const clockwiseDirection = (directionIndex + 1) % 4;
            maxPathLength = Math.max(
                maxPathLength,
                findLongestPath(nextRow, nextColumn, clockwiseDirection, false, 2 - expectedValue)
            );
        }
        
        memoizationTable[memoIndex] = maxPathLength + 1;
        return maxPathLength + 1;
    };

    let longestVSegment = 0;
    
    // Try starting from every cell with value 1
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            if (grid[rowIndex][columnIndex] === 1) {
                // Try all 4 diagonal directions from this starting point
                for (let direction = 0; direction < 4; direction++) {
                    const pathLength = findLongestPath(rowIndex, columnIndex, direction, true, 2) + 1;
                    longestVSegment = Math.max(longestVSegment, pathLength);
                }
            }
        }
    }
    
    return longestVSegment;
};