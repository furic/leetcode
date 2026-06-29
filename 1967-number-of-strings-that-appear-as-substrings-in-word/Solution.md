#  18:36 Substring Filter Count | 1 Line | O(p×n) | 0ms

# Intuition
Filter patterns to those that are substrings of `word` and count them.

# Approach
- Use `Array.filter` with `word.includes(pat)` and return the length.

# Complexity
- Time complexity: $$O(p \times n)$$ where $$p$$ = number of patterns and $$n$$ = length of `word` — each `includes` call is O(n).

- Space complexity: $$O(1)$$ extra beyond the output.

# Code
```typescript []
const numOfStrings = (patterns: string[], word: string): number =>
    patterns.filter(pat => word.includes(pat)).length;
```