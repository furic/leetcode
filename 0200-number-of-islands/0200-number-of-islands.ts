const numIslands = (grid: string[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    const floodFill = (r: number, c: number): void => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (grid[r][c] === '0') return;

        grid[r][c] = '0'; // Mark as visited by sinking the land
        floodFill(r - 1, c);
        floodFill(r + 1, c);
        floodFill(r, c - 1);
        floodFill(r, c + 1);
    };

    let islandCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                floodFill(r, c);
            }
        }
    }

    return islandCount;
};