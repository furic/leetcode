# Rolling DP Skip Neutralization | 20 Lines | O(m×n) | 40ms

# Intuition
At each cell, the robot either collects the coins (positive or negative) or neutralizes the cell (treats it as 0, costing one of its 2 skip tokens). Tracking the maximum coins reachable at each cell for each possible number of skips used (0, 1, 2) lets us solve this with a standard grid DP.

# Approach
- **State:** `dp[col][skips]` = best total coins reachable at column `col` having used exactly `skips` neutralizations so far. We roll across rows in-place, so `dp[col]` always represents the best value reachable at `(currentRow, col)`.
- **Initialise:** Set `dp[1][0] = dp[1][1] = dp[1][2] = 0` — before any row is processed, the robot hasn't entered the grid yet. All other entries are `-Infinity`.
- **Transition for each cell `(row, col)` with value `cell`:**
  - `skips=0`: no neutralizations available — must take the cell. `dp[col][0] = max(from_left, from_above) + cell`.
  - `skips=1`: either take the cell (extending a `skips=1` path), or skip the cell (extend a `skips=0` path without adding `cell`). `dp[col][1] = max(take_left, take_above, skip_left, skip_above)`.
  - `skips=2`: same pattern but extending `skips=2` or skipping from `skips=1`.
- **Update order matters:** Process `skips=2` before `skips=1` before `skips=0` within each cell — each level reads the pre-update value of the level below (same `dp[col]` entry). If processed low-to-high, a level-0 update would corrupt the level-1 skip calculation.
- The "skip" transitions (`dp[col-1][k-1]` and `dp[col][k-1]`) carry over the best accumulated coins without adding `cell`, representing neutralization of the current cell.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is processed once with O(1) work.

- Space complexity: $$O(n)$$ — rolling column array; rows are processed in-place.

# Code
```typescript []
const maximumAmount = (coins: number[][]): number => {
    const cols = coins[0].length;

    const dp: number[][] = Array.from({ length: cols + 1 }, () =>
        Array(3).fill(-Infinity)
    );
    dp[1][0] = dp[1][1] = dp[1][2] = 0;

    for (const row of coins) {
        for (let col = 1; col <= cols; col++) {
            const cell = row[col - 1];

            dp[col][2] = Math.max(
                dp[col - 1][2] + cell,
                dp[col][2]     + cell,
                dp[col - 1][1],
                dp[col][1],
            );
            dp[col][1] = Math.max(
                dp[col - 1][1] + cell,
                dp[col][1]     + cell,
                dp[col - 1][0],
                dp[col][0],
            );
            dp[col][0] = Math.max(dp[col - 1][0], dp[col][0]) + cell;
        }
    }

    return dp[cols][2];
};
```