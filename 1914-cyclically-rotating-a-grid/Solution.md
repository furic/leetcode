# Layer Perimeter Extract Rotate Place | 22 Lines | O(m×n) | 59ms

# Intuition
The grid is composed of concentric rectangular layers. Each layer's elements form a closed loop — rotating the layer is equivalent to cyclically shifting its flattened sequence by `k % perimeter` positions.

# Approach
- Iterate over each layer (from outermost to innermost). For an `m × n` grid there are `min(m, n) / 2` layers.
- For each layer, traverse its perimeter in order: left side top-to-bottom, bottom side left-to-right, right side bottom-to-top, top side right-to-left. Collect both the coordinates and values into parallel arrays.
- Compute `effectiveK = k % perimeter` to handle large `k`.
- Write values back into the grid at each coordinate, shifted by `effectiveK` positions in the reverse direction: `values[(i + perimeter - effectiveK) % perimeter]` at position `i`.
- The subtraction (rather than addition) is because counter-clockwise rotation shifts each element to the position `effectiveK` steps ahead in the traversal order.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is visited exactly once across all layers.

- Space complexity: $$O(m + n)$$ — the coordinate and value arrays for one layer at a time.

# Code
```typescript []
const rotateGrid = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let layer = 0; layer < Math.min(rows, cols) / 2; layer++) {
        const rowCoords: number[] = [];
        const colCoords: number[] = [];
        const values:    number[] = [];

        for (let r = layer; r < rows - layer - 1; r++) {
            rowCoords.push(r); colCoords.push(layer); values.push(grid[r][layer]);
        }
        for (let c = layer; c < cols - layer - 1; c++) {
            rowCoords.push(rows - layer - 1); colCoords.push(c); values.push(grid[rows - layer - 1][c]);
        }
        for (let r = rows - layer - 1; r > layer; r--) {
            rowCoords.push(r); colCoords.push(cols - layer - 1); values.push(grid[r][cols - layer - 1]);
        }
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
```