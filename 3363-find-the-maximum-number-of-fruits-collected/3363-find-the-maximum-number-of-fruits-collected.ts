const maxCollectedFruits = (fruits: number[][]): number => {
    const gridSize = fruits.length;
    const midPoint = Math.ceil((gridSize - 1) / 2);
    let totalFruitsCollected = 0;

    // Child 1: Collect diagonal path (0,0) -> (n-1,n-1)
    for (let i = 0; i < gridSize; i++) {
        totalFruitsCollected += fruits[i][i];
    }

    // Child 3: Bottom-left triangle path (n-1,0) -> (n-1,n-2)
    // Moves: up-right, right, down-right from previous column
    const updateFromLeftNeighbors = (row: number, column: number) => {
        let maxFromLeft = 0;
        if (row - 1 >= gridSize - column) {
            maxFromLeft = fruits[row - 1][column - 1];
        }
        if (row >= gridSize - column) {
            maxFromLeft = Math.max(maxFromLeft, fruits[row][column - 1]);
        }
        if (row + 1 >= gridSize - column && row + 1 < gridSize) {
            maxFromLeft = Math.max(maxFromLeft, fruits[row + 1][column - 1]);
        }
        fruits[row][column] += maxFromLeft;
    };

    for (let column = 1; column <= midPoint - 1; column++) {
        for (let row = gridSize - 1; row >= gridSize - column - 1; row--) {
            updateFromLeftNeighbors(row, column);
        }
    }
    for (let column = midPoint; column <= gridSize - 2; column++) {
        for (let row = gridSize - 1; row >= column + 1; row--) {
            updateFromLeftNeighbors(row, column);
        }
    }
    totalFruitsCollected += fruits[gridSize - 1][gridSize - 2];

    // Child 2: Top-right triangle path (0,n-1) -> (n-2,n-1)  
    // Moves: down-left, down, down-right from previous row
    const updateFromTopNeighbors = (row: number, column: number) => {
        let maxFromTop = 0;
        if (column - 1 >= gridSize - row) {
            maxFromTop = fruits[row - 1][column - 1];
        }
        if (column >= gridSize - row) {
            maxFromTop = Math.max(maxFromTop, fruits[row - 1][column]);
        }
        if (column + 1 >= gridSize - row && column + 1 < gridSize) {
            maxFromTop = Math.max(maxFromTop, fruits[row - 1][column + 1]);
        }
        fruits[row][column] += maxFromTop;
    };

    for (let row = 1; row <= midPoint - 1; row++) {
        for (let column = gridSize - 1; column >= gridSize - row - 1; column--) {
            updateFromTopNeighbors(row, column);
        }
    }
    for (let row = midPoint; row <= gridSize - 2; row++) {
        for (let column = gridSize - 1; column >= row + 1; column--) {
            updateFromTopNeighbors(row, column);
        }
    }
    totalFruitsCollected += fruits[gridSize - 2][gridSize - 1];

    return totalFruitsCollected;
};