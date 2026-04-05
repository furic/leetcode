# Parity Window Sliding Cost Swap | 20 Lines | O(n) | 9ms

# Intuition
Special indices must be non-adjacent (a special index is a local max, so two adjacent specials would be contradictory). Interior indices `1..n-2` support at most `floor((n-2)/2)` non-adjacent specials. For odd-length arrays, all odd interior indices are exactly non-adjacent — sum their costs. For even-length arrays, a pure odd-index selection leaves one gap, and we slide a window to find the cheapest single swap of one odd index for an adjacent even index.

# Approach
- **`costToMakeSpecial(i)`:** Cost to raise `nums[i]` strictly above both neighbours = `max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i])`.
- **Odd `n`:** Interior odd indices `1, 3, 5, ..., n-2` are exactly `(n-1)/2` non-adjacent positions — the maximum possible. Sum their costs directly.
- **Even `n`:** The maximum number of specials is `k = (n-2)/2`. A natural candidate set is odd indices `1, 3, ..., 2k-1`. But this is only one configuration — we can replace any one odd index `2i+1` with its right neighbour `2i+2` (swapping one odd index for an even one in the window) to potentially reduce cost.
  - Start with `windowCost` = sum of costs for all `k` odd indices.
  - Slide from right to left: subtract `costToMakeSpecial(2i+1)` and add `costToMakeSpecial(2i+2)` — this models replacing one odd index with its even neighbour.
  - Track the minimum cost across all window positions.

# Complexity
- Time complexity: $$O(n)$$ — one pass for initial window cost, one pass for sliding.

- Space complexity: $$O(1)$$ — only scalar accumulators.

# Code
```typescript []
const minIncrease = (nums: number[]): number => {
    const n = nums.length;

    const costToMakeSpecial = (i: number): number => {
        const neighbourMax = Math.max(nums[i - 1], nums[i + 1]);
        return neighbourMax >= nums[i] ? neighbourMax - nums[i] + 1 : 0;
    };

    if (n % 2 !== 0) {
        let total = 0;
        for (let i = 1; i < n - 1; i += 2) total += costToMakeSpecial(i);
        return total;
    }

    const k = (n - 2) / 2;
    let windowCost = 0;
    for (let i = 0; i < k; i++) windowCost += costToMakeSpecial(2 * i + 1);

    let minCost = windowCost;
    for (let i = k - 1; i >= 0; i--) {
        windowCost = windowCost - costToMakeSpecial(2 * i + 1) + costToMakeSpecial(2 * i + 2);
        if (windowCost < minCost) minCost = windowCost;
    }

    return minCost;
};
```