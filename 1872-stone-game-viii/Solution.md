# Prefix Sum Suffix DP | 8 Lines | O(n) | 61ms

# Intuition
After converting to prefix sums, picking stones up to index `i` scores `prefix[i]` for the current player. The key insight: whoever picks last picks the entire remaining prefix. Working backward, `best` tracks the optimal score difference the current player can force from position `i` onward.

# Approach
- Convert `stones` to prefix sums in-place.
- Start with `best = prefix[n-1]` — if the current player picks everything from index 1, they score `prefix[n-1]`.
- Scan `i` from `n-2` down to `1`: at each position, the current player can pick stones through index `i` (scoring `prefix[i]`) while the opponent then faces the remaining subproblem with value `best`. Update `best = max(best, prefix[i] - best)`.
- The subtraction `prefix[i] - best` represents: current player scores `prefix[i]`, opponent plays optimally and achieves `best` from the rest — net difference is `prefix[i] - best`.

# Complexity
- Time complexity: $$O(n)$$ — one pass for prefix sums, one backward pass.

- Space complexity: $$O(1)$$ — in-place modification.

# Code
```typescript []
const stoneGameVIII = (stones: number[]): number => {
    const n = stones.length;

    for (let i = 1; i < n; i++) stones[i] += stones[i - 1];

    let best = stones[n - 1];
    for (let i = n - 2; i >= 1; i--)
        best = Math.max(best, stones[i] - best);

    return best;
};
```