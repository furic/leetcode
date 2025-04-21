function sortMatrix(grid: number[][]): number[][] {
    const n = grid.length;

    // Helper to collect and sort diagonals
    const processDiagonal = (startRow: number, startCol: number, increasing: boolean) => {
        let r = startRow, c = startCol;
        const diagonal = [];

        // Collect the diagonal
        while (r < n && c < n) {
            diagonal.push(grid[r][c]);
            r++;
            c++;
        }

        // Sort the diagonal
        diagonal.sort((a, b) => increasing ? a - b : b - a);

        // Replace the diagonal
        r = startRow;
        c = startCol;
        for (const val of diagonal) {
            grid[r][c] = val;
            r++;
            c++;
        }
    };

    // Process bottom-left triangle (including middle diagonal) - non-increasing
    for (let row = 0; row < n; row++) {
        processDiagonal(row, 0, false);
    }

    // Process top-right triangle - non-decreasing
    for (let col = 1; col < n; col++) {
        processDiagonal(0, col, true);
    }

    return grid;
};