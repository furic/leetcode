# Sliding Window Substring Set | 9 Lines | O(n·k) | 89ms

# Intuition
Every binary code of length `k` is a number in the range `[0, 2^k - 1]`. We can slide a window of size `k` across `s`, convert each substring to an integer, and track unique values seen. If we collect all `2^k` distinct values, every code is covered.

# Approach
- Compute `totalCodes = 1 << k` (i.e. `2^k`) — the exact number of unique binary strings of length `k`.
- **Early exit:** The minimum string length needed to contain all `2^k` substrings of length `k` is `2^k + k - 1` (think of a De Bruijn sequence). If `s` is shorter than this, return `false` immediately.
- Slide a window of size `k` from index `0` to `s.length - k`:
  - Parse the substring as a base-2 integer and insert into a `Set<number>`.
  - If the set size ever reaches `totalCodes`, all codes are present — return `true` early.
- If the loop completes without hitting `totalCodes`, return `false`.
- Using a numeric set (rather than a string set) avoids repeated string allocations and gives O(1) hash operations, though `parseInt(..., 2)` itself takes O(k) per window.

# Complexity
- Time complexity: $$O(n \cdot k)$$ — we slide `n - k + 1` windows and each `parseInt` call processes `k` characters.

- Space complexity: $$O(2^k)$$ — the set holds at most `2^k` entries.

# Code
```typescript []
const hasAllCodes = (s: string, k: number): boolean => {
    const totalCodes = 1 << k;

    if (s.length < totalCodes + k - 1) return false;

    const seen = new Set<number>();

    for (let i = 0; i <= s.length - k; i++) {
        seen.add(parseInt(s.slice(i, i + k), 2));
        if (seen.size === totalCodes) return true;
    }

    return false;
};
```