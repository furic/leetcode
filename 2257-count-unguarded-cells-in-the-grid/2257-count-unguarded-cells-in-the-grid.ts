const countUnguarded = (
    rows: number,
    cols: number,
    guards: number[][],
    walls: number[][],
): number => {
    // Cell state constants
    const EMPTY = 0;
    const GUARD = 1;
    const WALL = 2;
    const GUARDED = 3;

    // Flatten 2D grid into 1D array for better memory efficiency
    const grid = new Uint8Array(rows * cols);
    
    // Start with all cells, then subtract guards and walls
    let unguardedCount = rows * cols - guards.length - walls.length;

    // Convert 2D coordinates to 1D array index
    const getIndex = (row: number, col: number): number => row * cols + col;

    // Mark guard positions
    for (const [row, col] of guards) {
        grid[getIndex(row, col)] = GUARD;
    }

    // Mark wall positions
    for (const [row, col] of walls) {
        grid[getIndex(row, col)] = WALL;
    }

    // Process guard's line of sight in all four directions
    const processGuardVision = (guardRow: number, guardCol: number): void => {
        // Mark a cell as guarded and return true if we hit an obstacle (guard/wall)
        const markCellIfVisible = (row: number, col: number): boolean => {
            const cellIndex = getIndex(row, col);
            const cellState = grid[cellIndex];

            // Stop if we hit a guard or wall
            if (cellState === GUARD || cellState === WALL) {
                return true;
            }

            // Mark empty cell as guarded
            if (cellState === EMPTY) {
                grid[cellIndex] = GUARDED;
                unguardedCount--;
            }

            return false;
        };

        // Cast vision in all four cardinal directions
        // North (up)
        for (let row = guardRow - 1; row >= 0; row--) {
            if (markCellIfVisible(row, guardCol)) break;
        }

        // South (down)
        for (let row = guardRow + 1; row < rows; row++) {
            if (markCellIfVisible(row, guardCol)) break;
        }

        // West (left)
        for (let col = guardCol - 1; col >= 0; col--) {
            if (markCellIfVisible(guardRow, col)) break;
        }

        // East (right)
        for (let col = guardCol + 1; col < cols; col++) {
            if (markCellIfVisible(guardRow, col)) break;
        }
    };

    // Process vision for each guard
    for (const [guardRow, guardCol] of guards) {
        processGuardVision(guardRow, guardCol);
    }

    return unguardedCount;
};