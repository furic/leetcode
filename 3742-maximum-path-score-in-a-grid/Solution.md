# Column Budget DP Rolling Score | 28 Lines | O(m×n×k) | 653ms

# Intuition
At each cell we can arrive from above (same column) or from the left (previous column). Tracking the best score for each remaining budget level at each column lets us propagate optimally without enumerating all paths.

# Approach
- **State:** `dp[col][remainingK]` = best score reachable at column `col` with exactly `remainingK` budget remaining. Initialise `dp[0][k] = 0`, everything else `-1` (unreachable).
- **Transition per cell `(r, c)`:**
  - Merge best reachable scores from the current column (came from above) and the left column (came from left): `best[budget] = max(dp[c][budget], dp[c-1][budget])`.
  - If `grid[r][c] === 0`: no cost, no score — `dp[c] = best` directly.
  - If `grid[r][c] !== 0` (value 1 or 2): costs 1 budget, adds `cellValue` to score. For each `budget ≥ 1`, propagate: `dp[c][budget - 1] = best[budget] + cellValue`. Reset `dp[c]` to `-1` first to avoid stale values.
- **Answer:** `max(dp[cols-1][0..k])` — best score at the last column with any remaining budget ≥ 0. Return `-1` if no reachable state exists.
- Processing row by row, column by column ensures arrival directions (from above or left) are always already computed before each cell.

# Complexity
- Time complexity: $$O(m \times n \times k)$$ — each of the `m×n` cells processes a budget array of size `k+1`.

- Space complexity: $$O(n \times k)$$ — the `dp` array for all columns at the current row.

# Code
```typescript []
const maxPathScore = (grid: number[][], k: number): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    let dp: Int32Array[] = Array.from({ length: cols }, () => new Int32Array(k + 1).fill(-1));
    dp[0][k] = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellValue = grid[r][c];

            const best = new Int32Array(k + 1).fill(-1);
            for (let budget = 0; budget <= k; budget++)
                best[budget] = Math.max(best[budget], dp[c][budget]);
            if (c > 0)
                for (let budget = 0; budget <= k; budget++)
                    best[budget] = Math.max(best[budget], dp[c - 1][budget]);

            if (cellValue !== 0) {
                dp[c].fill(-1);
                for (let budget = 1; budget <= k; budget++)
                    if (best[budget] !== -1)
                        dp[c][budget - 1] = best[budget] + cellValue;
            } else {
                dp[c] = best;
            }
        }
    }

    let maxScore = -1;
    for (let budget = 0; budget <= k; budget++)
        maxScore = Math.max(maxScore, dp[cols - 1][budget]);
    return maxScore;
};
```