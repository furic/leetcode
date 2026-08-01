# Interval DP Score Difference | 8 Lines | O(n²) | 1ms

# Intuition
`dp[l][r]` represents the maximum score difference (current player minus opponent) achievable over the subarray `[l, r]`. The current player picks either end, and the opponent then plays optimally on the remaining subarray.

# Approach
- Base case: `dp[i][i] = nums[i]` — the only element goes to the current player.
- Transition: `dp[l][r] = max(nums[l] - dp[l+1][r], nums[r] - dp[l][r-1])` — pick left or right, then subtract the opponent's optimal result on the remainder.
- Player 1 wins if `dp[0][n-1] >= 0` — their net advantage over player 2 is non-negative.

# Complexity
- Time complexity: $$O(n^2)$$ — filling the DP table.

- Space complexity: $$O(n^2)$$ — the DP table.

# Code
```typescript []
const predictTheWinner = (nums: number[]): boolean => {
    const n = nums.length;
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) dp[i][i] = nums[i];

    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;
            dp[l][r] = Math.max(
                nums[l] - dp[l + 1][r],
                nums[r] - dp[l][r - 1],
            );
        }
    }

    return dp[0][n - 1] >= 0;
};
```