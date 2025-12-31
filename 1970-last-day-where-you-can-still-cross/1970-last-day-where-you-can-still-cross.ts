/**
 * Finds the last day you can walk from top row to bottom row on land
 * Uses Union-Find with backwards simulation: start from fully flooded, add land back day by day
 * Strategy: Connect top/bottom rows to virtual nodes, detect when they become connected
 */
const latestDayToCross = (row: number, col: number, cells: number[][]): number => {
    const totalCells = row * col;
    
    // Virtual nodes: connect all top row cells to virtualTopNode, bottom row to virtualBottomNode
    // When these become connected, a path exists from top to bottom
    const virtualTopNode = totalCells;
    const virtualBottomNode = totalCells + 1;

    // Union-Find data structures (need space for totalCells + 2 virtual nodes)
    const parent: number[] = Array.from({ length: totalCells + 2 }, (_, i) => i);
    const rank: number[] = Array(totalCells + 2).fill(0);
    
    // Track which cells are currently land (false = water, true = land)
    const isLand: boolean[][] = Array.from({ length: row }, () => Array(col).fill(false));

    /**
     * Find root of set with path compression
     */
    const find = (x: number): number => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    };

    /**
     * Union two sets by rank
     */
    const union = (a: number, b: number): void => {
        const rootA = find(a);
        const rootB = find(b);
        
        if (rootA === rootB) return;
        
        // Union by rank: attach smaller tree under larger tree
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else {
            parent[rootB] = rootA;
            if (rank[rootA] === rank[rootB]) {
                rank[rootA]++;
            }
        }
    };

    // Four cardinal directions: down, up, right, left
    const rowDirections = [1, -1, 0, 0];
    const colDirections = [0, 0, 1, -1];

    // Process cells backwards: from fully flooded to gradually adding land
    for (let dayIndex = totalCells - 1; dayIndex >= 0; dayIndex--) {
        // Convert from 1-based to 0-based indexing
        const currentRow = cells[dayIndex][0] - 1;
        const currentCol = cells[dayIndex][1] - 1;
        
        // Add this cell back as land
        isLand[currentRow][currentCol] = true;
        
        // Convert 2D coordinates to 1D cell index
        const cellIndex = currentRow * col + currentCol;

        // Connect to virtual top node if in first row
        if (currentRow === 0) {
            union(cellIndex, virtualTopNode);
        }
        
        // Connect to virtual bottom node if in last row
        if (currentRow === row - 1) {
            union(cellIndex, virtualBottomNode);
        }

        // Union with adjacent land cells in all 4 directions
        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            const neighborRow = currentRow + rowDirections[directionIndex];
            const neighborCol = currentCol + colDirections[directionIndex];
            
            // Check bounds and if neighbor is land
            if (
                neighborRow >= 0 && neighborRow < row &&
                neighborCol >= 0 && neighborCol < col &&
                isLand[neighborRow][neighborCol]
            ) {
                const neighborIndex = neighborRow * col + neighborCol;
                union(cellIndex, neighborIndex);
            }
        }

        // Check if top and bottom are now connected (path exists!)
        if (find(virtualTopNode) === find(virtualBottomNode)) {
            return dayIndex;
        }
    }
    
    // Edge case: should never reach here given problem constraints
    return 0;
};