# Closed-Form Math Formula | 1 Line | O(1) | 0ms

# Intuition
No matter how you split `n` into ones, the total cost is always the same. This hints at a closed-form answer rather than an optimization problem.

# Approach
- **Invariant observation:** Every split `x → a + b` costs `a * b`. Across all splits, each pair of "eventual ones" contributes exactly `1 × 1 = 1` to the total cost the moment their lineages first separate. Since every one must be separated from every other one exactly once, the total cost equals the number of unique pairs among `n` ones.
- The number of unique pairs from `n` items is the combination `C(n, 2) = n × (n - 1) / 2`.
- This is independent of the order or grouping of splits — any valid sequence of splits to reach `n` ones produces the same total cost.
- **Verification:**
  - `n = 3`: `3 × 2 / 2 = 3` ✓
  - `n = 4`: `4 × 3 / 2 = 6` ✓

# Complexity
- Time complexity: $$O(1)$$ — direct arithmetic formula.

- Space complexity: $$O(1)$$ — no extra space used.

# Code
```typescript []
const minCost = (n: number): number => n * (n - 1) / 2;
```