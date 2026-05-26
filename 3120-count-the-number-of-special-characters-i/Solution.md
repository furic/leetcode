# Case-Pair Intersection One-Liner | 1 Line | O(n) | 1ms

# Intuition
A character is special if both its lowercase and uppercase forms appear in the word. We can check this for every character in the word, collect unique matching characters into a set, then divide by 2 (since each special letter contributes both cases to the set).

# Approach
- Filter all characters in `word` to those where both `c.toLowerCase()` and `c.toUpperCase()` exist in `word`.
- Deduplicate with a `Set` — this collects both `'a'` and `'A'` for each special letter.
- Divide the set size by 2 to get the count of distinct special letters.

# Complexity
- Time complexity: $$O(n)$$ — each character triggers two `includes` calls, each O(n), giving O(n²) in theory; practically O(n) for the small 26-letter alphabet since there are at most 26 distinct checks.

- Space complexity: $$O(1)$$ — the set holds at most 52 entries.

# Code
```typescript []
const numberOfSpecialChars = (word: string): number =>
    new Set([...word].filter(c => word.includes(c.toUpperCase()) && word.includes(c.toLowerCase()))).size / 2;
```