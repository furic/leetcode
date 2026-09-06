# Rolling 1D DP Subsequence Count | 6 Lines | O(m×n) | 11ms

# Intuition
Classic subsequence DP: `dp[j]` = number of ways to match the first `j` characters of `t` using characters from `s` seen so far. Updating right-to-left within each character of `s` prevents using the same `s[i]` twice.

# Approach
- Initialise `dp[0] = 1` (empty subsequence always matches).
- For each character `s[i-1]`, scan `j` from `min(i, m)` down to `1`. If `s[i-1] === t[j-1]`, add `dp[j-1]` to `dp[j]` — this counts all new ways to extend a match of `t[0..j-2]` with `s[i-1]`.
- Right-to-left traversal ensures we use each `s[i]` at most once per state update.

# Complexity
- Time complexity: $$O(m \times n)$$ where $$m = |s|$$ and $$n = |t|$$.

- Space complexity: $$O(n)$$ — single DP array of length `|t| + 1`.

# Code
```typescript []
const numDistinct = (s: string, t: string): number => {
    const dp = new Array(t.length + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= s.length; i++)
        for (let j = Math.min(i, t.length); j >= 1; j--)
            if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];

    return dp[t.length];
};
```