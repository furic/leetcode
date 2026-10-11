# Last-Seen Index Sliding Window | 11 Lines | O(n) | 0ms

# Intuition
Track the last index at which each character appeared. When a character repeats inside the current window, jump the window start just past its previous occurrence instead of shrinking one step at a time.

# Approach
- Keep `lastSeen[code]` (initialised to `-1`) for every ASCII code, plus `windowStart` for the left edge of the current duplicate-free window.
- For each index `i`, move `windowStart` to `max(windowStart, lastSeen[code] + 1)`. The `max` ensures the window never moves backwards when the previous occurrence is already outside it.
- Update `maxLen` with `i - windowStart + 1`, then record `lastSeen[code] = i`.
- Return `maxLen`.

# Complexity
- Time complexity: $$O(n)$$ — single pass, each step is O(1).

- Space complexity: $$O(1)$$ — fixed 128-entry array.

# Code
```typescript []
const lengthOfLongestSubstring = (s: string): number => {
    const lastSeen = new Int32Array(128).fill(-1);
    let windowStart = 0;
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        windowStart = Math.max(windowStart, lastSeen[code] + 1);
        maxLen = Math.max(maxLen, i - windowStart + 1);
        lastSeen[code] = i;
    }

    return maxLen;
};
```