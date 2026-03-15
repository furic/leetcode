# Tiered Comma Count by Digit Range | 12 Lines | O(log n) | 0ms

# Intuition
Numbers naturally group into tiers by how many commas they contain: `[1,000–999,999]` have 1 comma, `[1,000,000–999,999,999]` have 2, and so on. Each tier contributes uniformly, so we can sum per-tier contributions in O(log n) rather than iterating over every number.

# Approach
- Early exit: numbers below `1000` have no commas.
- Iterate `commaCount = 1, 2, 3, ...`:
  - `tierStart = 10^(3 × commaCount)` — the first number with exactly `commaCount` commas (e.g. `commaCount = 1` → `1000`).
  - `tierEnd = 10^(3 × (commaCount + 1)) - 1` — the last number with exactly `commaCount` commas (e.g. `commaCount = 1` → `999999`).
  - If `tierStart > n`, no numbers in this tier are in range — break.
  - `numbersInTier = min(n, tierEnd) - tierStart + 1` — how many numbers from this tier fall within `[1, n]`, clamping at `n` if the tier extends beyond it.
  - Add `commaCount × numbersInTier` to `totalCommas`.
- The loop runs at most `⌊log₁₀₀₀(n)⌋` times — for `n ≤ 10^15`, that's at most 5 iterations.
- Note: for `n ≤ 10^15`, standard JS `number` handles `10^15` exactly, but `tierStart` uses `10 ** (3 * commaCount)` which stays precise within this range.

# Complexity
- Time complexity: $$O(\log n)$$ — number of tiers is $$\lfloor \log_{1000} n \rfloor$$, at most 5 for `n ≤ 10^{15}`.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const countCommas = (n: number): number => {
    if (n < 1000) return 0;

    let totalCommas = 0;

    for (let commaCount = 1; ; commaCount++) {
        const tierStart = 10 ** (3 * commaCount);
        const tierEnd   = 10 ** (3 * (commaCount + 1)) - 1;

        if (tierStart > n) break;

        const numbersInTier = Math.min(n, tierEnd) - tierStart + 1;
        totalCommas += commaCount * numbersInTier;
    }

    return totalCommas;
};
```