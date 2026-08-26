# Sliding Window Shortest Lex-Smallest Beautiful | 14 Lines | O(n) | 2ms

# Intuition
Use a sliding window that maintains exactly `k` ones, starting from the leftmost `1` in each valid window (no leading zeros). Among all valid windows, track the shortest, and among equal-length ones, the lexicographically smallest.

# Approach
- Early exit if total ones in `s` < `k`.
- Slide `right` across `s`, accumulating `ones`. When `ones > k` or the left pointer is on a `0`, shrink from the left.
- When `ones === k`, the window `s[left..right]` is a candidate — update `best` if it's shorter, or same length and lexicographically smaller.
- Initialise `best = s` (worst case) so any valid window immediately improves it.

# Complexity
- Time complexity: $$O(n)$$ — each character enters and exits the window at most once; string comparison is O(window size) but bounded by the answer length.

- Space complexity: $$O(n)$$ — for the output string slices.

# Code
```typescript []
const shortestBeautifulSubstring = (s: string, k: number): string => {
    if (s.split('').filter(c => c === '1').length < k) return '';

    let best = s;
    let ones = 0, left = 0;

    for (let right = 0; right < s.length; right++) {
        ones += +s[right];

        while (ones > k || s[left] === '0') ones -= +s[left++];

        if (ones === k) {
            const window = s.slice(left, right + 1);
            if (window.length < best.length || (window.length === best.length && window < best))
                best = window;
        }
    }

    return best;
};
```