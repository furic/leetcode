# Last-Seen Index Counting | 8 Lines | O(n) | 10ms

# Intuition
For a substring ending at index `i` to contain all of `a`, `b`, `c`, its start must be at or before the most recent occurrence of each character. The binding constraint is the earliest of the three last-seen positions — any start from `0` up to that position keeps all three characters in range.

# Approach
- Track `lastSeen[a]`, `lastSeen[b]`, `lastSeen[c]` — the most recent index of each character, initialized to `-1`.
- For each index `i`, update the corresponding `lastSeen` entry.
- The number of valid starting points for substrings ending at `i` is `1 + min(lastSeen[0], lastSeen[1], lastSeen[2])` — this counts all starts in `[0, min(...)]`. If any character hasn't appeared yet, the min is `-1`, contributing `0`.
- Sum this count across all `i`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$ — three scalar trackers.

# Code
```typescript []
const numberOfSubstrings = (s: string): number => {
    const lastSeen = [-1, -1, -1];
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        lastSeen[s.charCodeAt(i) - 97] = i;
        count += 1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]);
    }

    return count;
};
```