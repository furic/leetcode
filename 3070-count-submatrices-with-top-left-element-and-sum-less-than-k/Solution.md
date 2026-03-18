# Column Prefix Sum Running Rectangle | 10 Lines | O(m×n) | 3ms

# Intuition
Every valid submatrix must include the top-left cell `(0,0)`, so it spans rows `0..r` and columns `0..c` for some `(r, c)`. We can compute all such rectangle sums incrementally using column prefix sums.

# Approach
- Maintain `colSums[c]` — the running sum of column `c` from row `0` down to the current row `r`. After processing row `r`, `colSums[c]` equals the sum of `grid[0..r][c]`.
- For each row `r`, iterate columns `c` left to right:
  - Update `colSums[c] += grid[r][c]`.
  - Add `colSums[c]` to `rectSum` — `rectSum` now holds the sum of the submatrix spanning rows `0..r` and columns `0..c`.
  - If `rectSum <= k`, increment `count`.
- Reset `rectSum = 0` at the start of each new row (the column scan restarts from column `0`).
- **Why this works:** `rectSum` at position `(r, c)` is the 2D prefix sum anchored at `(0,0)`, built by summing `colSums[0..c]`. Each `colSums[c]` is the vertical prefix, and summing them left to right gives the full rectangle sum in O(1) amortised per cell.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is visited exactly once.

- Space complexity: $$O(n)$$ — the `colSums` array of length `cols`.

# Code
```typescript []
const countSubmatrices = (grid: number[][], k: number): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const colSums = new Array(cols).fill(0);
    let count = 0;

    for (let r = 0; r < rows; r++) {
        let rectSum = 0;
        for (let c = 0; c < cols; c++) {
            colSums[c] += grid[r][c];
            rectSum += colSums[c];
            if (rectSum <= k) count++;
        }
    }

    return count;
};
```