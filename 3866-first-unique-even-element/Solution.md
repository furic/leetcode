# Frequency Map First Unique Even | 3 Lines | O(n) | 1ms

# Intuition
Count all frequencies first, then scan the array in order to find the first even number with a count of exactly `1`. The two-pass approach guarantees we respect original order while having O(1) frequency lookups.

# Approach
- Build a `Map<number, number>` of frequencies with a single pass over `nums`.
- Use `Array.find` to scan `nums` left to right, returning the first element that is both even (`num % 2 === 0`) and unique (`frequency === 1`).
- Return `-1` via the nullish coalescing fallback if no such element exists.
- The order of conditions in the `find` predicate doesn't affect correctness, but checking parity first short-circuits the map lookup for odd numbers.

# Complexity
- Time complexity: $$O(n)$$ — one pass to build frequencies, one pass for `find` (at most `n` checks).

- Space complexity: $$O(n)$$ — the frequency map holds at most `n` distinct entries.

# Code
```typescript []
const firstUniqueEven = (nums: number[]): number => {
    const frequency = new Map<number, number>();
    for (const num of nums) frequency.set(num, (frequency.get(num) ?? 0) + 1);
    return nums.find(num => num % 2 === 0 && frequency.get(num) === 1) ?? -1;
};
```