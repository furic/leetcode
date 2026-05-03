# Double Concatenation Substring Check | 1 Line | O(n) | 0ms

# Intuition
Every rotation of `s` is a substring of `s + s`. So `goal` is a rotation of `s` if and only if `goal` appears in `s + s` (and lengths match to prevent trivial matches).

# Approach
- Check `s.length === goal.length` first to ensure they're the same size.
- Check if `goal` is a substring of `s + s` using `includes`.

# Complexity
- Time complexity: $$O(n)$$ — `includes` uses an O(n) search on a string of length `2n`.

- Space complexity: $$O(n)$$ — for the concatenated string `s + s`.

# Code
```typescript []
const rotateString = (s: string, goal: string): boolean =>
    s.length === goal.length && (s + s).includes(goal);
```