# Sort and Greedy Merge | 10 Lines | O(n log n) | 8ms

# Intuition
If we sort intervals by start time, any overlapping intervals must be adjacent. We can then do a single left-to-right pass, extending the current merged interval greedily whenever the next interval overlaps.

# Approach
- Sort `intervals` by start value ascending.
- Seed the result with the first interval.
- Iterate through every interval (including the first — it simply matches `lastMerged` and no-ops):
  - If the current interval's start ≤ `lastMerged`'s end, they overlap (or touch) — extend `lastMerged`'s end to `max(lastMerged[1], interval[1])`. Taking the max handles the case where the current interval is fully contained within the last merged one.
  - Otherwise, there's a gap — push the current interval as a new entry in `merged`.
- Return `merged`.
- Mutating `lastMerged[1]` directly works because `lastMerged` is a reference to the last array in `merged`.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort; the merge pass is $$O(n)$$.

- Space complexity: $$O(n)$$ — for the output array; $$O(\log n)$$ additional for the sort stack.

# Code
```typescript []
const merge = (intervals: number[][]): number[][] => {
    intervals.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [intervals[0]];

    for (const interval of intervals) {
        const lastMerged = merged[merged.length - 1];
        if (interval[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], interval[1]);
        } else {
            merged.push(interval);
        }
    }

    return merged;
};
```