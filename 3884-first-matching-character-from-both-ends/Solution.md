# Linear Mirror Match Scan | 5 Lines | O(n) | 0ms

# Intuition
We need the smallest index where a character matches its mirror counterpart. A simple left-to-right scan returns the first such index immediately.

# Approach
- Iterate `i` from `0` to `n-1`.
- At each index, compare `s[i]` with `s[n - i - 1]` (its mirror position).
- Return `i` on the first match — since we scan left to right, this is the smallest valid index.
- If the loop completes with no match, return `-1`.
- Note: when `n` is odd and `i` reaches the middle index (`i === n - i - 1`), the comparison is always true (`s[i] === s[i]`), so a match is guaranteed before or at the midpoint for any string of odd length.

# Complexity
- Time complexity: $$O(n)$$ — at most `n` comparisons.

- Space complexity: $$O(1)$$ — no extra storage.

# Code
```typescript []
const firstMatchingIndex = (s: string): number => {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[s.length - i - 1]) return i;
    }
    return -1;
};
```