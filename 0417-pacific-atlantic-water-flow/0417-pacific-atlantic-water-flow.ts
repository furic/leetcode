const pacificAtlantic = (heights: number[][]): number[][] => {
    if (!heights || heights.length === 0) return [];

    const rows = heights.length;
    const cols = heights[0].length;
    
    const reachesPacific: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );
    const reachesAtlantic: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );
    
    const directions: number[][] = [
        [1, 0],   // down
        [-1, 0],  // up
        [0, 1],   // right
        [0, -1]   // left
    ];

    // DFS to mark all cells that can reach the given ocean
    const markReachableCells = (row: number, col: number, canReachOcean: boolean[][]): void => {
        canReachOcean[row][col] = true;
        
        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            
            // Check if neighbor is valid and water can flow from neighbor to current cell
            if (
                neighborRow >= 0 && neighborRow < rows && 
                neighborCol >= 0 && neighborCol < cols &&
                !canReachOcean[neighborRow][neighborCol] && 
                heights[neighborRow][neighborCol] >= heights[row][col]
            ) {
                markReachableCells(neighborRow, neighborCol, canReachOcean);
            }
        }
    };

    // Start DFS from all Pacific Ocean borders (top and left edges)
    for (let row = 0; row < rows; row++) {
        markReachableCells(row, 0, reachesPacific);
    }
    for (let col = 0; col < cols; col++) {
        markReachableCells(0, col, reachesPacific);
    }

    // Start DFS from all Atlantic Ocean borders (bottom and right edges)
    for (let row = 0; row < rows; row++) {
        markReachableCells(row, cols - 1, reachesAtlantic);
    }
    for (let col = 0; col < cols; col++) {
        markReachableCells(rows - 1, col, reachesAtlantic);
    }

    // Find cells that can reach both oceans
    const result: number[][] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (reachesPacific[row][col] && reachesAtlantic[row][col]) {
                result.push([row, col]);
            }
        }
    }
    
    return result;
};