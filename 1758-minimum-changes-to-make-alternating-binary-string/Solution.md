# Two-Pattern Mismatch Count | 5 Lines | O(n) | 0ms

# Intuition
There are exactly two valid alternating patterns: `"010101..."` and `"101010..."`. The number of operations to reach one pattern equals the number of mismatches against it, and crucially, mismatches against one pattern are exactly the matches of the other — they're complements summing to `n`.

# Approach
- Count `mismatchesWithPattern0`: positions where `s[i]` doesn't equal the expected bit `i % 2` (the `"010101..."` pattern).
- Mismatches against the other pattern `"101010..."` is simply `s.length - mismatchesWithPattern0`, since every position is either a mismatch for one pattern or the other, never both.
- Return `Math.min` of the two — whichever alternating target is cheaper to reach.
- `i & 1` is used instead of `i % 2` as a minor bitwise optimization (equivalent for non-negative indices).

# Complexity
- Time complexity: $$O(n)$$ — single pass over the string.

- Space complexity: $$O(1)$$ — only one counter variable needed.

# Code
```typescript []
const minOperations = (s: string): number => {
    let mismatchesWithPattern0 = 0;

    for (let i = 0; i < s.length; i++)
        if (+s[i] !== (i & 1)) mismatchesWithPattern0++;

    return Math.min(mismatchesWithPattern0, s.length - mismatchesWithPattern0);
};
```