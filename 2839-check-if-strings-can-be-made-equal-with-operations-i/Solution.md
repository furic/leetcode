# Parity Position Set Equality | 1 Line | O(1) | 1ms

# Intuition
Swapping indices `i` and `j` where `j - i = 2` can only mix characters at even positions with other even positions, or odd positions with odd positions. So two strings are reachable from each other if and only if their even-indexed characters form the same multiset and their odd-indexed characters form the same multiset.

# Approach
- For a length-4 string, even indices are `[0, 2]` and odd indices are `[1, 3]`.
- Check both parity groups independently: sort the two characters from each group in both strings and compare.
- If both groups match as multisets, the strings are reachable from each other — return `true`. Otherwise `false`.
- The sort of a 2-element array is O(1) given the fixed size, making the whole solution effectively constant time.

# Complexity
- Time complexity: $$O(1)$$ — fixed-length string, constant number of operations.

- Space complexity: $$O(1)$$ — only small temporary arrays of size 2.

# Code
```typescript []
const canBeEqual = (s1: string, s2: string): boolean =>
    [[0, 2], [1, 3]].every(([a, b]) => [s1[a], s1[b]].sort().join('') === [s2[a], s2[b]].sort().join(''));
```