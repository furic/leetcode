# Linear Offset Formula | 1 Line | O(1) | 0ms

# Intuition
Within the constraint `n ≤ 100,000`, every number has at most one comma. Commas only appear starting from `1,000`, so the total count is simply how many integers in `[1000, n]` exist.

# Approach
- Numbers `1` to `999` have no commas — zero contribution.
- Numbers `1,000` to `n` each have exactly one comma (within the constraint `n ≤ 100,000`, no number reaches the two-comma threshold of `1,000,000`).
- Count of such numbers = `n - 999`, clamped to `0` for `n < 1000` via `Math.max(0, n - 999)`.
- No iteration needed — this is a direct closed-form count.

# Complexity
- Time complexity: $$O(1)$$ — single arithmetic expression.

- Space complexity: $$O(1)$$ — no storage used.

# Code
```typescript []
const countCommas = (n: number): number => Math.max(0, n - 999);
```