# Dynamic Programming Path Finding | 44 Lines | O(nm) | 195ms

# Intuition
This problem requires finding the longest V-shaped diagonal path that starts with 1 and alternates between 2 and 0. The key insight is that we can start from any cell with value 1, move in one of four diagonal directions following the pattern 1→2→0→2→0..., and make at most one 90-degree clockwise turn during the journey. This is essentially a path-finding problem with specific constraints that can be solved using dynamic programming with memoization.

# Approach
I'll use dynamic programming with memoization to explore all possible V-shaped paths:

1. **State Definition**: Each state is defined by (row, column, direction, canTurn, expectedValue), where:
   - Position: current row and column
   - Direction: one of 4 diagonal directions (0-3)
   - Turn capability: whether we can still make the one allowed turn
   - Expected value: what value we're looking for next (alternating between 2 and 0)

2. **Diagonal Directions**: Define 4 diagonal directions as coordinate offsets: bottom-right, bottom-left, top-left, top-right.

3. **Recursive Exploration**: From each state, try:
   - Continue in the same direction with alternating target value
   - If turn is available, try 90-degree clockwise turn to next direction

4. **Memoization**: Use a 1D array to cache results, encoding the state as a unique index to avoid recomputation.

5. **Starting Points**: Try starting from every cell containing 1, exploring all 4 initial directions.

The algorithm systematically explores all possible V-shaped paths while respecting the sequence pattern and turn constraints.

# Complexity
- Time complexity: $$O(nm)$$
  - Each cell can be visited with at most 8 different states (4 directions × 2 turn states)
  - Memoization ensures each state is computed only once
  - Total unique states: O(nm × 8) = O(nm)
  - Each state computation takes O(1) time

- Space complexity: $$O(nm)$$
  - Memoization table stores results for all possible states
  - Table size: nm × 4 directions × 2 turn states = O(nm)
  - Recursion depth is at most the path length, which is bounded by grid dimensions

# Code
```typescript []
const lenOfVDiagonal = (grid: number[][]): number => {
    const DIAGONAL_DIRECTIONS = [
        [1, 1],   
        [1, -1],  
        [-1, -1], 
        [-1, 1],  
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
        
        if (nextRow < 0 || nextColumn < 0 || nextRow >= totalRows || nextColumn >= totalColumns || 
            grid[nextRow][nextColumn] !== expectedValue) {
            return 0;
        }

        const turnFlag = canStillTurn ? 1 : 0;
        const memoIndex = nextRow * totalColumns * 8 + nextColumn * 8 + directionIndex * 2 + turnFlag;
        if (memoizationTable[memoIndex] !== -1) {
            return memoizationTable[memoIndex];
        }

        let maxPathLength = findLongestPath(nextRow, nextColumn, directionIndex, canStillTurn, 2 - expectedValue);
        
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
    
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            if (grid[rowIndex][columnIndex] === 1) {
                for (let direction = 0; direction < 4; direction++) {
                    const pathLength = findLongestPath(rowIndex, columnIndex, direction, true, 2) + 1;
                    longestVSegment = Math.max(longestVSegment, pathLength);
                }
            }
        }
    }
    
    return longestVSegment;
};
```