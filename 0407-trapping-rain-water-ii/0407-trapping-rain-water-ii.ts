type Cell = {
    row: number;
    col: number;
    height: number;
}

const trapRainWater = (heightMap: number[][]): number => {
    const rows = heightMap.length;
    const cols = heightMap[0].length;

    // Can't trap water if grid is too small
    if (rows < 3 || cols < 3) return 0;

    const isVisited: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );

    // Min heap to process cells from lowest to highest
    const minHeap = new MinPriorityQueue<Cell>((cell) => cell.height);

    // Add all border cells to heap (water can't be trapped at borders)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isBorderCell = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
            
            if (isBorderCell) {
                minHeap.enqueue({ row, col, height: heightMap[row][col] });
                isVisited[row][col] = true;
            }
        }
    }

    const directions = [
        [0, 1],   // right
        [0, -1],  // left
        [1, 0],   // down
        [-1, 0]   // up
    ];

    let totalWaterTrapped = 0;

    // Process cells from lowest to highest (like water filling from outside in)
    while (!minHeap.isEmpty()) {
        const currentCell = minHeap.dequeue();

        // Check all 4 neighbors
        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = currentCell.row + rowDelta;
            const neighborCol = currentCell.col + colDelta;

            // Skip if out of bounds or already visited
            if (
                neighborRow < 0 || 
                neighborRow >= rows || 
                neighborCol < 0 || 
                neighborCol >= cols ||
                isVisited[neighborRow][neighborCol]
            ) {
                continue;
            }

            isVisited[neighborRow][neighborCol] = true;
            const neighborHeight = heightMap[neighborRow][neighborCol];

            // Water is trapped if neighbor is lower than current water level
            if (neighborHeight < currentCell.height) {
                totalWaterTrapped += currentCell.height - neighborHeight;
            }

            // Add neighbor with the max height (either its own or current water level)
            minHeap.enqueue({
                row: neighborRow,
                col: neighborCol,
                height: Math.max(neighborHeight, currentCell.height)
            });
        }
    }

    return totalWaterTrapped;
};