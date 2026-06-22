# Character Frequency Bottleneck | 3 Lines | O(n) | 6ms

# Intuition
"balloon" needs: b×1, a×1, l×2, o×2, n×1. The number of times we can form it is limited by whichever character runs out first — the bottleneck.

# Approach
- Count frequencies of the five relevant characters.
- Divide `l` and `o` counts by 2 (since "balloon" needs two of each).
- Return the floor of the minimum across all five.

# Complexity
- Time complexity: $$O(n)$$ — one pass over `text`.

- Space complexity: $$O(1)$$ — fixed 5-entry frequency map.

# Code
```typescript []
const maxNumberOfBalloons = (text: string): number => {
    const freq: Record<string, number> = { b: 0, a: 0, l: 0, o: 0, n: 0 };
    for (const ch of text) if (ch in freq) freq[ch]++;
    return Math.floor(Math.min(freq.b, freq.a, freq.l / 2, freq.o / 2, freq.n));
};
```