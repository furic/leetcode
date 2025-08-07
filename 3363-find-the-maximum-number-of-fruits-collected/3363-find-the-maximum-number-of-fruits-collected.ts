const maxCollectedFruits = (fruits: number[][]): number => {
    const gridSize = fruits.length;
    const midPoint = Math.ceil((gridSize - 1) / 2);
    let totalFruitsCollected = 0;

    // Child 1: Collect fruits along main diagonal from (0,0) to (n-1,n-1)
    const collectDiagonalPath = (): number => {
        let diagonalSum = 0;
        for (let position = 0; position < gridSize; position++) {
            diagonalSum += fruits[position][position];
        }
        return diagonalSum;
    };

    // Update cell with maximum fruits reachable from left-adjacent cells
    // Child 3 moves: up-right, right, down-right from previous column
    const updateFromLeftNeighbors = (row: number, column: number): void => {
        let maxFromLeftColumn = 0;
        
        // Check up-right move: (row-1, column-1) -> (row, column)
        if (row - 1 >= gridSize - column) {
            maxFromLeftColumn = fruits[row - 1][column - 1];
        }
        
        // Check right move: (row, column-1) -> (row, column)
        if (row >= gridSize - column) {
            maxFromLeftColumn = Math.max(maxFromLeftColumn, fruits[row][column - 1]);
        }
        
        // Check down-right move: (row+1, column-1) -> (row, column)
        if (row + 1 >= gridSize - column && row + 1 < gridSize) {
            maxFromLeftColumn = Math.max(maxFromLeftColumn, fruits[row + 1][column - 1]);
        }
        
        fruits[row][column] += maxFromLeftColumn;
    };

    // Update cell with maximum fruits reachable from top-adjacent cells  
    // Child 2 moves: down-left, down, down-right from previous row
    const updateFromTopNeighbors = (row: number, column: number): void => {
        let maxFromTopRow = 0;
        
        // Check down-left move: (row-1, column-1) -> (row, column)
        if (column - 1 >= gridSize - row) {
            maxFromTopRow = fruits[row - 1][column - 1];
        }
        
        // Check down move: (row-1, column) -> (row, column)
        if (column >= gridSize - row) {
            maxFromTopRow = Math.max(maxFromTopRow, fruits[row - 1][column]);
        }
        
        // Check down-right move: (row-1, column+1) -> (row, column)
        if (column + 1 >= gridSize - row && column + 1 < gridSize) {
            maxFromTopRow = Math.max(maxFromTopRow, fruits[row - 1][column + 1]);
        }
        
        fruits[row][column] += maxFromTopRow;
    };

    // Calculate optimal path for Child 3: bottom-left triangle (n-1,0) -> (n-1,n-1)
    const calculateBottomLeftTrianglePath = (): void => {
        // Process columns from left to midpoint
        for (let column = 1; column <= midPoint - 1; column++) {
            // Process valid rows from bottom to the constraint boundary
            for (let row = gridSize - 1; row >= gridSize - column - 1; row--) {
                updateFromLeftNeighbors(row, column);
            }
        }
        
        // Process remaining columns from midpoint to near-end
        for (let column = midPoint; column <= gridSize - 2; column++) {
            // Process valid rows respecting the diagonal constraint
            for (let row = gridSize - 1; row >= column + 1; row--) {
                updateFromLeftNeighbors(row, column);
            }
        }
    };

    // Calculate optimal path for Child 2: top-right triangle (0,n-1) -> (n-1,n-1)  
    const calculateTopRightTrianglePath = (): void => {
        // Process rows from top to midpoint
        for (let row = 1; row <= midPoint - 1; row++) {
            // Process valid columns from right to the constraint boundary
            for (let column = gridSize - 1; column >= gridSize - row - 1; column--) {
                updateFromTopNeighbors(row, column);
            }
        }
        
        // Process remaining rows from midpoint to near-end
        for (let row = midPoint; row <= gridSize - 2; row++) {
            // Process valid columns respecting the diagonal constraint
            for (let column = gridSize - 1; column >= row + 1; column--) {
                updateFromTopNeighbors(row, column);
            }
        }
    };

    // Main algorithm execution
    totalFruitsCollected += collectDiagonalPath();
    
    // Calculate and accumulate path for Child 3 (bottom-left origin)
    calculateBottomLeftTrianglePath();
    totalFruitsCollected += fruits[gridSize - 1][gridSize - 2]; // End position for Child 3
    
    // Calculate and accumulate path for Child 2 (top-right origin)  
    calculateTopRightTrianglePath();
    totalFruitsCollected += fruits[gridSize - 2][gridSize - 1]; // End position for Child 2

    return totalFruitsCollected;
};