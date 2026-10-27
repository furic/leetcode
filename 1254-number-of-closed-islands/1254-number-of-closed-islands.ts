const closedIsland = (grid: number[][]): number => {
    const rows = grid.length, cols = grid[0].length;

    // Floods the island through (r, c). Returns 1 if it never touches the border, else 0.
    const isClosed = (r: number, c: number): number => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return 0; // stepped off the grid: touches the border
        if (grid[r][c]) return 1;                                // water, or land already flooded
        grid[r][c] = 1;                                          // mark visited by turning it into water

        // Bitwise & (not &&) so all four sides are always flooded, even after one returns 0
        return isClosed(r + 1, c) & isClosed(r - 1, c) & isClosed(r, c + 1) & isClosed(r, c - 1);
    };

    let count = 0;
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (!grid[r][c]) count += isClosed(r, c);

    return count;
};