# Case Analysis on Min/Max Positions | 19 Lines | O(n) | 36ms

Case Analysis on Min/Max Positions | 19 Lines | O(n) |

```markdown
# Intuition
Sorting any substring that isn't the whole string can only move characters closer to their final positions. The answer is always `0`, `1`, `2`, `3`, or `-1`, and which one depends only on where the smallest and largest characters sit.

# Approach
- **Already sorted:** return `0`.
- **Length 2 and unsorted:** the only substrings are single characters (no-ops), and the whole string isn't allowed, so return `-1`.
- **One operation:** if `s[0]` is already the minimum character, sort the suffix `s[1..n-1]`. If `s[n-1]` is already the maximum character, sort the prefix `s[0..n-2]`. Either way the string ends up sorted.
- **Two operations:** if the minimum or maximum appears in the interior (indices `1..n-2`), one sort moves it into place and the next sort finishes the job.
  - An interior minimum is moved to the front by sorting the prefix ending at it. Then `s[0]` is the minimum, so one more sort of the suffix finishes.
  - An interior maximum is handled symmetrically.
- **Three operations:** the remaining case is when the minimum appears only at the last index and the maximum only at the first index. Neither can be fixed with a single sort that excludes the whole string, so three sorts are needed.

# Complexity
- Time complexity: $$O(n)$$ — a linear scan to check sortedness, a scan for min/max, and one more scan for interior extremes.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const minOperations = (s: string): number => {
    const n = s.length;

    let alreadySorted = true;
    for (let i = 1; i < n; i++) {
        if (s[i] < s[i - 1]) { alreadySorted = false; break; }
    }
    if (alreadySorted) return 0;

    if (n === 2) return -1;

    let minChar = s[0], maxChar = s[0];
    for (let i = 1; i < n; i++) {
        if (s[i] < minChar) minChar = s[i];
        if (s[i] > maxChar) maxChar = s[i];
    }

    if (s[0] === minChar || s[n - 1] === maxChar) return 1;

    for (let i = 1; i < n - 1; i++) {
        if (s[i] === minChar || s[i] === maxChar) return 2;
    }

    return 3;
};
```
```

Greedy | String | Sorting