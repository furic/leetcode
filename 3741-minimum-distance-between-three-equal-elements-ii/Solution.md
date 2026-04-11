# Two-Index Tracking Linear Scan | 10 Lines | O(n) | 13ms

# Intuition
The distance of a sorted triple `(i, j, k)` simplifies to `2 * (k - i)`. To minimize this, we want the smallest outer span — which means finding the closest pair of two previously seen indices of the same value when we encounter a third occurrence.

# Approach
- Track `latestIdx[v]` and `secondIdx[v]` — the two most recent indices where value `v` appeared.
- When we see value `v` at index `i` for the third or later time, `secondIdx[v]` is the earliest of the two prior indices, and `i - secondIdx[v]` is the outer span of the best triple ending at `i`.
- Update rolling: `secondIdx[v] = latestIdx[v]`, then `latestIdx[v] = i`.
- Track the global minimum span and return `2 * minDist`, or `-1` if no triple was found.
- **Why `secondIdx` gives the minimum span:** For any new occurrence at `i`, the triple `(secondIdx[v], latestIdx[v], i)` has outer span `i - secondIdx[v]`. Using an earlier first index would only widen the span, so the two most recent prior indices always form the tightest possible triple ending at `i`.

# Complexity
- Time complexity: $$O(n)$$ — single pass; array lookups are O(1) since values are bounded by `n`.

- Space complexity: $$O(n)$$ — two index arrays of size `n + 1`.

# Code
```typescript []
const minimumDistance = (nums: number[]): number => {
    const n = nums.length;
    const latestIdx  = new Array(n + 1).fill(-1);
    const secondIdx  = new Array(n + 1).fill(-1);
    let minDist = Infinity;

    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (secondIdx[val] !== -1)
            minDist = Math.min(minDist, i - secondIdx[val]);
        secondIdx[val] = latestIdx[val];
        latestIdx[val] = i;
    }

    return minDist === Infinity ? -1 : 2 * minDist;
};
```