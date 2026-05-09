const rotateGrid = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let layer = 0; layer < Math.min(rows, cols) / 2; layer++) {
        const rowCoords: number[] = [];
        const colCoords: number[] = [];
        const values:    number[] = [];

        // Left side (top to bottom)
        for (let r = layer; r < rows - layer - 1; r++) {
            rowCoords.push(r); colCoords.push(layer); values.push(grid[r][layer]);
        }
        // Bottom side (left to right)
        for (let c = layer; c < cols - layer - 1; c++) {
            rowCoords.push(rows - layer - 1); colCoords.push(c); values.push(grid[rows - layer - 1][c]);
        }
        // Right side (bottom to top)
        for (let r = rows - layer - 1; r > layer; r--) {
            rowCoords.push(r); colCoords.push(cols - layer - 1); values.push(grid[r][cols - layer - 1]);
        }
        // Top side (right to left)
        for (let c = cols - layer - 1; c > layer; c--) {
            rowCoords.push(layer); colCoords.push(c); values.push(grid[layer][c]);
        }

        const perimeter = values.length;
        const effectiveK = k % perimeter;

        for (let i = 0; i < perimeter; i++) {
            grid[rowCoords[i]][colCoords[i]] = values[(i + perimeter - effectiveK) % perimeter];
        }
    }

    return grid;
};