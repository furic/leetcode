# Dual Max-Min DP Sign Tracking | 20 Lines | O(m×n) | 3ms

# Intuition
Multiplying by a negative number flips the sign, turning the current maximum into the new minimum and vice versa. Tracking both the maximum and minimum product at each cell handles all sign-flip cases correctly.

# Approach
- Initialize `dpMax[0][0] = dpMin[0][0] = grid[0][0]`.
- Fill the first row and first column with running products — only one path exists to each cell along the edges.
- For each interior cell `(r, c)`:
  - If `grid[r][c] >= 0`: multiply the max predecessor by the cell for the new max, and multiply the min predecessor for the new min.
  - If `grid[r][c] < 0`: the sign flips — multiply the min predecessor (most negative) by the cell to get the largest positive product (new max), and multiply the max predecessor for the new min.
- The predecessor at each cell is the better of `(r-1, c)` (from above) and `(r, c-1)` (from left).
- After filling, check `dpMax[rows-1][cols-1]`:
  - If `>= 0`: return it modulo `10^9 + 7`.
  - If `< 0`: all paths yield negative products — return `-1`.
- Modulo is applied only at the final step to avoid corrupting intermediate comparisons.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell computed in $$O(1)$$.

- Space complexity: $$O(m \times n)$$ — two DP tables; reducible to $$O(n)$$ with rolling rows.

# Code
```typescript []
const maxProductPath = (grid: number[][]): number => {
    const MOD = 1_000_000_007;
    const rows = grid.length;
    const cols = grid[0].length;

    const dpMax = Array.from({ length: rows }, () => Array(cols).fill(0));
    const dpMin = Array.from({ length: rows }, () => Array(cols).fill(0));

    dpMax[0][0] = dpMin[0][0] = grid[0][0];

    for (let c = 1; c < cols; c++)
        dpMax[0][c] = dpMin[0][c] = dpMax[0][c - 1] * grid[0][c];

    for (let r = 1; r < rows; r++)
        dpMax[r][0] = dpMin[r][0] = dpMax[r - 1][0] * grid[r][0];

    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            const cell = grid[r][c];
            if (cell >= 0) {
                dpMax[r][c] = Math.max(dpMax[r - 1][c], dpMax[r][c - 1]) * cell;
                dpMin[r][c] = Math.min(dpMin[r - 1][c], dpMin[r][c - 1]) * cell;
            } else {
                dpMax[r][c] = Math.min(dpMin[r - 1][c], dpMin[r][c - 1]) * cell;
                dpMin[r][c] = Math.max(dpMax[r - 1][c], dpMax[r][c - 1]) * cell;
            }
        }
    }

    const best = dpMax[rows - 1][cols - 1];
    return best >= 0 ? best % MOD : -1;
};
```