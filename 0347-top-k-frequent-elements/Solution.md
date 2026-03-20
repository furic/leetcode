# Frequency Map Sort Slice | 5 Lines | O(n log n) | 10ms

# Intuition
Count frequencies, then sort by frequency descending and take the top `k`. Straightforward and clean using built-in map and sort.

# Approach
- Build a `Map<number, number>` frequency counter in a single pass over `nums`.
- Convert to an array of `[value, frequency]` entries, sort descending by frequency, take the first `k` entries, and map back to just the values.
- `Array.from(freq.entries())` gives us sortable pairs without needing a separate structure.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by sorting the entries; frequency counting is $$O(n)$$.

- Space complexity: $$O(n)$$ — the frequency map and entries array hold at most `n` distinct elements.

# Code
```typescript []
const topKFrequent = (nums: number[], k: number): number[] => {
    const freq = new Map<number, number>();
    for (const num of nums) freq.set(num, (freq.get(num) ?? 0) + 1);

    return Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
};
```