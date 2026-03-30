# XOR Reachability DP Boolean Table | 18 Lines | O(m×n×V) | 590ms

# Intuition
Since values are bounded to `[0, 1023]`, all possible XOR accumulations along any path also fit in `[0, 1023]`. We can track which XOR values are reachable at each cell with a boolean table, then scan for the minimum reachable XOR at the destination.

# Approach
- Define `dp[r][c][xorVal] = true` if there exists a path from `(0,0)` to `(r,c)` whose XOR equals `xorVal`.
- **Base case:** `dp[0][0][grid[0][0]] = true` — the starting cell contributes its own value.
- **Transition:** For each cell `(r,c)` and each reachable `xorVal`, propagate to the right and down neighbours:
  - `dp[r][c+1][xorVal ^ grid[r][c+1]] = true`
  - `dp[r+1][c][xorVal ^ grid[r+1][c]] = true`
- Cells are processed in row-major order, which guarantees that `(r,c)` is always fully computed before we try to propagate from it (since we can only move right or down).
- **Answer:** Scan `dp[m-1][n-1][0..1023]` and return the first `xorVal` that is `true` — the minimum reachable XOR at the destination.
- `MAX_XOR = 1024` covers all possible XOR values since grid values are at most 1023 (10 bits).

# Complexity
- Time complexity: $$O(m \times n \times V)$$ where $$V = 1024$$ — processing each cell iterates over all possible XOR values.

- Space complexity: $$O(m \times n \times V)$$ — the full DP table; reducible to $$O(n \times V)$$ with rolling rows.

# Code
```typescript []
const minCost = (grid: number[][]): number => {
    const m = grid.length;
    const n = grid[0].length;
    const MAX_XOR = 1024;

    const dp: boolean[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Array<boolean>(MAX_XOR).fill(false))
    );

    dp[0][0][grid[0][0]] = true;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            for (let xorVal = 0; xorVal < MAX_XOR; xorVal++) {
                if (!dp[row][col][xorVal]) continue;

                if (col + 1 < n) dp[row][col + 1][xorVal ^ grid[row][col + 1]] = true;
                if (row + 1 < m) dp[row + 1][col][xorVal ^ grid[row + 1][col]] = true;
            }
        }
    }

    const dest = dp[m - 1][n - 1];
    for (let xorVal = 0; xorVal < MAX_XOR; xorVal++) {
        if (dest[xorVal]) return xorVal;
    }
    return -1;
};
```