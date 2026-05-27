#  18:21 Last Lower vs First Upper Index Check | 12 Lines | O(n) | 62ms

# Intuition
A letter is special if all its lowercase occurrences come before any uppercase occurrence. This is equivalent to: the last lowercase index < the first uppercase index. We only need to track those two values per letter.

# Approach
- Scan `word` once:
  - For lowercase `c`: update `lastLowerIdx[c]` to the current index (we always want the last one).
  - For uppercase `C`: record `firstUpperIdx[C]` only if not yet set (we want the first one).
- Count letters where both are set and `lastLowerIdx[i] < firstUpperIdx[i]`.

# Complexity
- Time complexity: $$O(n)$$ — single scan plus a constant-size (26) check loop.

- Space complexity: $$O(1)$$ — two fixed-size arrays of 26 elements.

# Code
```typescript []
const numberOfSpecialChars = (word: string): number => {
    const lastLowerIdx = new Array(26).fill(-1);
    const firstUpperIdx = new Array(26).fill(-1);

    for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (ch >= 'a') {
            lastLowerIdx[ch.charCodeAt(0) - 97] = i;
        } else {
            const idx = ch.charCodeAt(0) - 65;
            if (firstUpperIdx[idx] === -1) firstUpperIdx[idx] = i;
        }
    }

    let count = 0;
    for (let i = 0; i < 26; i++) {
        if (lastLowerIdx[i] !== -1 && firstUpperIdx[i] !== -1 && lastLowerIdx[i] < firstUpperIdx[i])
            count++;
    }

    return count;
};
```