# 2D Prefix Sum Balance + X Count | 20 Lines | O(m×n) | 33ms

# Intuition
Every valid submatrix must include `(0,0)`, so it spans rows `0..r` and columns `0..c`. We need two simultaneous 2D prefix sums anchored at the top-left: one tracking the X/Y balance (X = +1, Y = −1), and one counting X occurrences. A submatrix is valid when balance = 0 and X count > 0.

# Approach
- Maintain two rolling row arrays (`prevBalance`, `prevXCount`) to avoid storing the full 2D prefix table.
- For each cell `(r, c)`, compute the 2D prefix using the standard inclusion-exclusion formula:
  - `curr[c] = cell_value + above[c] + left - above_left`
  - `above` comes from the previous row's array, `left` is the running value at `c - 1` in the current row.
- Apply this to both `balance` (X = +1, Y = −1, `.` = 0) and `xCount` (X = 1, else 0).
- After computing both prefix values at `(r, c)`, check: if `currBalance[c] === 0 && currXCount[c] > 0`, this submatrix (top-left to `(r,c)`) is valid — increment `count`.
- Swap `prev` arrays to `curr` at the end of each row.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is processed once with O(1) work.

- Space complexity: $$O(n)$$ — two pairs of rolling row arrays of length `cols`.

# Code
```typescript []
const numberOfSubmatrices = (grid: string[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    let prevBalance = new Int32Array(cols);
    let prevXCount  = new Int32Array(cols);
    let count = 0;

    for (let r = 0; r < rows; r++) {
        const currBalance = new Int32Array(cols);
        const currXCount  = new Int32Array(cols);
        let leftBalance = 0;
        let leftXCount  = 0;

        for (let c = 0; c < cols; c++) {
            const ch = grid[r][c];
            const balanceDelta = ch === 'X' ? 1 : ch === 'Y' ? -1 : 0;
            const isX          = ch === 'X' ? 1 : 0;

            const aboveBalance     = prevBalance[c];
            const aboveLeft        = c > 0 ? prevBalance[c - 1] : 0;
            currBalance[c] = balanceDelta + aboveBalance + leftBalance - aboveLeft;

            const aboveXCount      = prevXCount[c];
            const aboveLeftXCount  = c > 0 ? prevXCount[c - 1] : 0;
            currXCount[c] = isX + aboveXCount + leftXCount - aboveLeftXCount;

            if (currBalance[c] === 0 && currXCount[c] > 0) count++;

            leftBalance = currBalance[c];
            leftXCount  = currXCount[c];
        }

        prevBalance = currBalance;
        prevXCount  = currXCount;
    }

    return count;
};
```