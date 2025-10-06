type PathState = [waterLevel: number, row: number, col: number];

const swimInWater = (grid: number[][]): number => {
    const gridSize = grid.length;
    const directions: number[][] = [
        [0, 1],   // right
        [0, -1],  // left
        [1, 0],   // down
        [-1, 0]   // up
    ];

    const visitedCells = new Set<string>();
    
    // Min heap: prioritize paths with lower maximum water level
    const minHeap = new MinPriorityQueue<PathState>((state) => state[0]);
    
    const startRow = 0;
    const startCol = 0;
    const startWaterLevel = grid[startRow][startCol];
    
    minHeap.enqueue([startWaterLevel, startRow, startCol]);
    visitedCells.add(`${startRow},${startCol}`);
    
    const targetRow = gridSize - 1;
    const targetCol = gridSize - 1;

    while (!minHeap.isEmpty()) {
        const [currentWaterLevel, currentRow, currentCol] = minHeap.dequeue();

        // Reached destination
        if (currentRow === targetRow && currentCol === targetCol) {
            return currentWaterLevel;
        }

        // Explore all 4 neighbors
        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = currentRow + rowDelta;
            const neighborCol = currentCol + colDelta;
            const cellKey = `${neighborRow},${neighborCol}`;

            // Skip if out of bounds or already visited
            if (
                neighborRow < 0 || 
                neighborRow >= gridSize || 
                neighborCol < 0 || 
                neighborCol >= gridSize ||
                visitedCells.has(cellKey)
            ) {
                continue;
            }

            visitedCells.add(cellKey);
            
            // Water level must be at least the max of current path and neighbor's elevation
            const neighborElevation = grid[neighborRow][neighborCol];
            const requiredWaterLevel = Math.max(currentWaterLevel, neighborElevation);
            
            minHeap.enqueue([requiredWaterLevel, neighborRow, neighborCol]);
        }
    }

    // Should never reach here if input is valid
    return -1;
};