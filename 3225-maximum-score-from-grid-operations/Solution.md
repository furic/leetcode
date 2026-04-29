# Column DP Black Boundary Pairs | 26 Lines | O(n³) | 89ms

# Intuition
For each pair of adjacent columns, the score contribution depends on how deep each column is colored. A white cell scores if it has a black neighbour to its left or right — meaning the adjacent column is colored at least as deep as that cell's row. We can process columns left to right, tracking the optimal cut depth for each column pair.

# Approach
- **State:** For each column `col`, maintain two DP arrays indexed by the current column's cut depth `row` (0 = uncolored, 1..n = colored through row 0..row-1):
  - `dp0[row]` — best score where the current column is cut at `row` and the previous column contributes nothing to the right (either uncolored or fully accounted for).
  - `dp1[row]` — best score where the current column is cut at `row` and the previous column IS colored, potentially contributing white cells on its right side.
- **Transition:** For each previous cut `i` and current cut `row`:
  - `prevColSum` = sum of `grid[i..n-1][col-1]` — cells in the previous column below its cut (white, potentially adjacent to current column's black cells if `row > 0`).
  - `currColSum` = sum of `grid[0..i-1][col]` — cells in the current column above the previous cut (white if current column isn't colored that high, adjacent to previous column's black cells).
  - `newDp0[row]` takes the best of: carrying forward from dp0 with prevColSum, or inheriting dp1 (previous column already priced in).
  - `newDp1[row]` adds `currColSum` to the best reachable state, combining both columns' contributions.
- After processing all columns, the answer is `max(dp1)` — the best score where the last meaningful column was colored.

# Complexity
- Time complexity: $$O(n^3)$$ — `n` columns, each with $$O(n^2)$$ pairs of `(i, row)`.

- Space complexity: $$O(n)$$ — two rolling DP arrays of size `n + 1`.

# Code
```typescript []
const maximumScore = (grid: number[][]): number => {
    const n = grid.length;
    if (n === 1) return 0;

    let dp0 = new Array(n + 1).fill(0);
    let dp1 = new Array(n + 1).fill(0);

    for (let col = 1; col < n; col++) {
        const newDp0 = new Array(n + 1).fill(0);
        const newDp1 = new Array(n + 1).fill(0);

        for (let i = 0; i <= n; i++) {
            let prevColSum = 0;
            let currColSum = 0;
            for (let x = 0; x < i; x++) currColSum += grid[x][col];

            for (let row = 0; row <= n; row++) {
                if (row > 0 && row <= i) currColSum -= grid[row - 1][col];
                if (row > i)             prevColSum += grid[row - 1][col - 1];

                newDp0[row] = Math.max(newDp0[row], prevColSum + dp0[i], dp1[i]);
                newDp1[row] = Math.max(newDp1[row], currColSum + dp1[i], currColSum + prevColSum + dp0[i]);
            }
        }

        dp0 = newDp0;
        dp1 = newDp1;
    }

    return Math.max(...dp1);
};
```