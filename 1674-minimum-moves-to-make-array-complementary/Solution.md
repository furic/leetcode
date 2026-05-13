# Difference Array Pair Cost Sweep | 18 Lines | O(n + limit) | 8ms

# Intuition
For each symmetric pair `(lo, hi)`, the cost to reach any target sum varies by range: 0 moves if the target already matches, 1 move if one element can be adjusted, 2 moves otherwise. Instead of checking every target for every pair, we encode these costs into a difference array and sweep once.

# Approach
- For each pair `(nums[i], nums[n-1-i])`, let `lo = min`, `hi = max`. The pair's contribution to cost for a target sum `t` is:
  - `2` for `t < lo + 1` or `t > hi + limit` (both elements need changing)
  - `1` for `lo + 1 ≤ t < lo + hi` or `lo + hi < t ≤ hi + limit` (change only one)
  - `0` for `t = lo + hi` (pair already sums correctly)
- Encode this with a difference array `delta` over `[2, 2*limit]`:
  - Start all pairs at cost 2: `delta[2] += 2`
  - Drop by 1 at `lo + 1`: one element suffices
  - Drop by 1 at `lo + hi`: reach 0 at the exact sum
  - Rise by 1 at `lo + hi + 1`: back to cost 1
  - Rise by 1 at `hi + limit + 1`: back to cost 2 beyond this point
- Sweep the prefix sum of `delta` across all target sums and track the minimum cost.

# Complexity
- Time complexity: $$O(n + \text{limit})$$ — one pass over pairs, one sweep over target range.

- Space complexity: $$O(\text{limit})$$ — the difference array.

# Code
```typescript []
const minMoves = (nums: number[], limit: number): number => {
    const n = nums.length;
    const delta = new Int32Array((limit << 1) + 2);

    for (let i = 0; i < n >> 1; i++) {
        const lo = Math.min(nums[i], nums[n - 1 - i]);
        const hi = Math.max(nums[i], nums[n - 1 - i]);

        delta[2] += 2;
        delta[lo + 1]--;
        delta[lo + hi]--;
        delta[lo + hi + 1]++;
        delta[hi + limit + 1]++;
    }

    let minCost = n;
    let cost = 0;

    for (let target = 2; target <= limit * 2; target++) {
        cost += delta[target];
        minCost = Math.min(minCost, cost);
    }

    return minCost;
};
```