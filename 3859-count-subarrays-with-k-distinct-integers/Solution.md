# Dual Sliding Window Two Pointers | 28 Lines | O(n) | 53ms

# Intuition
"Exactly k distinct with each appearing ≥ m times" is hard to count directly. Instead, we decompose it using the classic sliding window identity: **exactly k = at most k − at most (k-1)**. But here we need a tighter decomposition that also enforces the frequency constraint, so we use two left pointers to bracket the valid range of left endpoints for each fixed right endpoint.

# Approach
- Maintain **two independent sliding windows** sharing the same `right` pointer but with separate left pointers `minLeft` and `maxLeft`:
  - **`minLeft` window** (`freqTotal`, `totalDistinct`): shrinks until `totalDistinct ≤ k`. This gives the leftmost valid left endpoint — any subarray starting before `minLeft` has more than `k` distinct values.
  - **`maxLeft` window** (`freqQualified`, `qualifiedDistinct`): advances `maxLeft` as far right as possible while `qualifiedDistinct ≥ k` (i.e. there are still `k` distinct values each with frequency ≥ m). This gives the first left endpoint where the qualified condition breaks.
- As `right` advances:
  - Add `nums[right]` to both frequency maps, updating `totalDistinct` and `qualifiedDistinct` accordingly (`qualifiedDistinct` increments when a value's frequency hits exactly `m`).
  - Shrink `minLeft` forward until `totalDistinct ≤ k`, removing elements from `freqTotal`.
  - Advance `maxLeft` forward while `qualifiedDistinct ≥ k`, removing elements from `freqQualified` (decrement `qualifiedDistinct` when a value's frequency drops below `m`).
- **Valid left endpoints** for the current `right` are `[minLeft, maxLeft)`:
  - Any `left ≥ maxLeft`: `qualifiedDistinct < k`, so fewer than `k` values meet the frequency threshold.
  - Any `left < minLeft`: `totalDistinct > k`, so too many distinct values.
  - The intersection `[minLeft, maxLeft)` gives subarrays with exactly `k` distinct values all appearing ≥ m times.
- Add `max(0, maxLeft - minLeft)` to the result each iteration.

# Complexity
- Time complexity: $$O(n)$$ — each element is added and removed from each window at most once; total work is $$O(4n)$$.

- Space complexity: $$O(k)$$ — the two frequency maps hold at most `k` distinct keys each at any point.

# Code
```typescript []
const countSubarrays = (nums: number[], k: number, m: number): number => {
    const n = nums.length;
    let result = 0;

    const freqTotal = new Map<number, number>();
    let totalDistinct = 0;
    let minLeft = 0;

    const freqQualified = new Map<number, number>();
    let qualifiedDistinct = 0;
    let maxLeft = 0;

    for (let right = 0; right < n; right++) {
        const val = nums[right];

        freqTotal.set(val, (freqTotal.get(val) ?? 0) + 1);
        if (freqTotal.get(val) === 1) totalDistinct++;

        freqQualified.set(val, (freqQualified.get(val) ?? 0) + 1);
        if (freqQualified.get(val) === m) qualifiedDistinct++;

        while (totalDistinct > k) {
            const leaving = nums[minLeft++];
            freqTotal.set(leaving, freqTotal.get(leaving)! - 1);
            if (freqTotal.get(leaving) === 0) totalDistinct--;
        }

        while (qualifiedDistinct >= k) {
            const leaving = nums[maxLeft++];
            freqQualified.set(leaving, freqQualified.get(leaving)! - 1);
            if (freqQualified.get(leaving) === m - 1) qualifiedDistinct--;
        }

        result += Math.max(0, maxLeft - minLeft);
    }

    return result;
};
```