# Frequency Sort Keypad Position Cost | 8 Lines | O(n + 26 log 26) | 17ms

# Intuition
Assign the most frequent letters to the cheapest positions (1 push each, first 8 slots), then 2 pushes, then 3 pushes. Sort frequencies descending and greedily assign.

# Approach
- Count character frequencies.
- Sort descending.
- The `i`-th most frequent character (0-indexed) occupies position `i` across 8 keys — its push cost is `floor(i / 8) + 1`.
- Multiply each frequency by its push cost and sum.

# Complexity
- Time complexity: $$O(n + 26 \log 26)$$ — one pass over `word`, constant-size sort.

- Space complexity: $$O(1)$$ — fixed 26-element array.

# Code
```typescript []
const minimumPushes = (word: string): number => {
    const freq = new Array(26).fill(0);
    for (const ch of word) freq[ch.charCodeAt(0) - 97]++;
    freq.sort((a, b) => b - a);

    let totalPushes = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;
        totalPushes += freq[i] * (Math.floor(i / 8) + 1);
    }

    return totalPushes;
};
```