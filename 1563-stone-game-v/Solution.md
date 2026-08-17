# Interval DP with Monotone Split Pointer | 30 Lines | O(n²) | 64ms

# Intuition
For each subarray `[l, r]`, Alice chooses a split point. Bob discards the heavier half; Alice scores the lighter one and plays recursively on it. Naively this is O(n³), but the split point is monotone as `r` increases (the optimal split can only move right), enabling O(n²) total.

# Approach
- **State:** `f[l][r]` = max score Alice gets from subarray `[l, r]`.
- **Auxiliary arrays** for O(1) range queries:
  - `maxL[l][r]` = max of `(total + f[l][j])` for `j ∈ [l, r]` — best left-half pick from `l` to any endpoint ≤ `r`.
  - `maxR[l][r]` = max of `(total + f[j][r])` for `j ∈ [l, r]` — best right-half pick from any start ≥ `l` to `r`.
- **Monotone split pointer:** For fixed `l`, as `r` increases, the split index `split` (rightmost index where left sum ≤ total/2) advances monotonically. Track running `leftSum` alongside.
- **Three cases for each `(l, r)`:**
  - Left half `[l, split]` has sum ≤ right: Alice takes left → look up `maxL[l][split]`.
  - Right half `[split+2, r]` has sum < left (strictly): Alice takes right → look up `maxR[split+2][r]`.
  - Equal split: Alice chooses — use `maxR[split+1][r]` (right includes the tie-split column).
- Update `maxL[l][r]` and `maxR[l][r]` incrementally.

# Complexity
- Time complexity: $$O(n^2)$$ — the split pointer advances at most `n` times per fixed `l`, amortized across all `r`.

- Space complexity: $$O(n^2)$$ — three `n × n` tables.

# Code
```typescript []
const stoneGameV = (stoneValue: number[]): number => {
    const n = stoneValue.length;
    const makeGrid = () => Array.from({ length: n }, () => new Array(n).fill(0));

    const f    = makeGrid();
    const maxL = makeGrid();
    const maxR = makeGrid();

    for (let l = n - 1; l >= 0; l--) {
        maxL[l][l] = maxR[l][l] = stoneValue[l];
        let total = stoneValue[l];
        let leftSum = 0;
        let split = l - 1;

        for (let r = l + 1; r < n; r++) {
            total += stoneValue[r];

            while (split + 1 < r && (leftSum + stoneValue[split + 1]) * 2 <= total) {
                leftSum += stoneValue[++split];
            }

            if (l <= split)           f[l][r] = Math.max(f[l][r], maxL[l][split]);
            if (split + 1 < r)        f[l][r] = Math.max(f[l][r], maxR[split + 2][r]);
            if (leftSum * 2 === total) f[l][r] = Math.max(f[l][r], maxR[split + 1][r]);

            maxL[l][r] = Math.max(maxL[l][r - 1], total + f[l][r]);
            maxR[l][r] = Math.max(maxR[l + 1][r], total + f[l][r]);
        }
    }

    return f[0][n - 1];
};
```