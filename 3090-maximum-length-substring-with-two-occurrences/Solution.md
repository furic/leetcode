# Sliding Window At-Most-2 Frequency | 8 Lines | O(n) | 0ms

# Intuition
A standard sliding window: expand `right`, and shrink `left` whenever any character exceeds 2 occurrences. Track the maximum window size.

# Approach
- Maintain a frequency array of size 26.
- For each new character at `right`, increment its count. If it exceeds 2, shrink the window from `left` until the count drops to 2.
- Update `maxLen` after each valid window.

# Complexity
- Time complexity: $$O(n)$$ — each character is added and removed at most once.

- Space complexity: $$O(1)$$ — fixed 26-element frequency array.

# Code
```typescript []
const maximumLengthSubstring = (s: string): number => {
    const freq = new Array(26).fill(0);
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 97;
        freq[idx]++;

        while (freq[idx] > 2) freq[s.charCodeAt(left++) - 97]--;

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
```