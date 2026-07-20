# Flat Index Cyclic Shift | 10 Lines | O(m×n) | 3ms

# Intuition
Flatten the 2D grid into a 1D sequence, shift by `k` positions (modulo total), then unflatten back into 2D.

# Approach
- Compute the effective shift `k %= total`. Return early if `k === 0`.
- For each cell `(r, c)`, compute its new flat index `(r*cols + c + k) % total`, then place the value at the corresponding 2D position in `result`.

# Complexity
- Time complexity: $$O(m \times n)$$ — one pass over all cells.

- Space complexity: $$O(m \times n)$$ — for the result grid.

# Code
```typescript []
const shiftGrid = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const total = rows * cols;

    k %= total;
    if (k === 0) return grid;

    const result: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const newIdx = (r * cols + c + k) % total;
            result[Math.floor(newIdx / cols)][newIdx % cols] = grid[r][c];
        }
    }

    return result;
};
```