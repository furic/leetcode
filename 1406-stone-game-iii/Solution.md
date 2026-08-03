# Suffix Sum DP Rolling Window | 10 Lines | O(n) | 7ms

# Intuition
`dp[i]` = the maximum score the current player can collect from stones `[i..n-1]`. The current player picks 1, 2, or 3 stones, and the opponent plays optimally on the rest. The opponent's optimal score is `suffixSum[j] - dp[j]` (they get what remains minus what the next player takes). So the current player maximises by minimising what the opponent can take.

# Approach
- Traverse right to left, maintaining a rolling suffix sum and `dp1`, `dp2`, `dp3` for the last three `dp` values.
- At each `i`: `dp[i] = suffixSum[i] - min(dp[i+1], dp[i+2], dp[i+3])`.
  - `suffixSum[i]` is the total available from `i` onward.
  - Subtracting the opponent's optimal `dp[j]` gives the current player's score.
- After the loop, Alice's score is `dp[0]`, Bob's is `total - dp[0]`.

# Complexity
- Time complexity: $$O(n)$$ — single right-to-left pass.

- Space complexity: $$O(1)$$ — three rolling DP variables.

# Code
```typescript []
const stoneGameIII = (stoneValue: number[]): string => {
    let dp1 = 0, dp2 = 0, dp3 = 0;
    let suffixSum = 0;

    for (let i = stoneValue.length - 1; i >= 0; i--) {
        suffixSum += stoneValue[i];
        const best = suffixSum - Math.min(dp1, dp2, dp3);
        dp3 = dp2; dp2 = dp1; dp1 = best;
    }

    const alice = dp1;
    const bob   = suffixSum - dp1;

    if (alice > bob) return 'Alice';
    if (alice < bob) return 'Bob';
    return 'Tie';
};
```