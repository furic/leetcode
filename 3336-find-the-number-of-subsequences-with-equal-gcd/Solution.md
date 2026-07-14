# Two-Subsequence GCD DP | 22 Lines | O(n × V²) | 245ms

# Intuition
Track the GCD of two disjoint subsequences simultaneously as we process each element. The state `dp[g1][g2]` captures how many ways we can assign elements so far to give running GCDs `g1` and `g2`. At the end, sum over all `dp[g][g]` where `g > 0`.

# Approach
- **State:** `dp[g1][g2]` = number of ways to partition elements seen so far into two disjoint subsequences (each possibly empty) with running GCDs `g1` and `g2`. The sentinel `g = 0` represents an empty subsequence (GCD undefined, acts as identity: `gcd(0, x) = x`).
- **Initial state:** `dp[0][0] = 1` — both subsequences empty.
- **Transition for each `num`:** For each current state `(g1, g2)` with `ways` ways, three choices:
  - **Skip `num`:** `next[g1][g2] += ways`.
  - **Add to seq1:** `next[gcd(g1, num)][g2] += ways`.
  - **Add to seq2:** `next[g1][gcd(g2, num)] += ways`.
- **Answer:** Sum `dp[g][g]` for all `g ∈ [1, maxVal]` — both non-empty subsequences have the same GCD `g`.
- The zero-sentinel ensures `gcd(0, num) = num`, so the first element added to an empty subsequence correctly initialises its GCD.

# Complexity
- Time complexity: $$O(n \times V^2)$$ where $$V = \max(\text{nums}) \leq 200$$ — for each of the `n` elements, we iterate over all $$V^2$$ states with an $$O(\log V)$$ GCD per transition, giving $$O(n \times V^2 \times \log V)$$ precisely, but effectively $$O(n \times V^2)$$ in practice.

- Space complexity: $$O(V^2)$$ — two rolling DP tables of size $$(V+1)^2$$.

# Code
```typescript []
const subsequencePairCount = (nums: number[]): number => {
    const MOD = 1_000_000_007;
    const maxVal = Math.max(...nums);

    const gcd = (a: number, b: number): number => {
        while (b !== 0) { const t = a % b; a = b; b = t; }
        return a;
    };

    let dp: number[][] = Array.from({ length: maxVal + 1 }, () => new Array(maxVal + 1).fill(0));
    dp[0][0] = 1;

    for (const num of nums) {
        const next: number[][] = Array.from({ length: maxVal + 1 }, () => new Array(maxVal + 1).fill(0));

        for (let g1 = 0; g1 <= maxVal; g1++) {
            const ng1 = gcd(g1, num);
            for (let g2 = 0; g2 <= maxVal; g2++) {
                const ways = dp[g1][g2];
                if (ways === 0) continue;

                const ng2 = gcd(g2, num);
                next[g1][g2]  = (next[g1][g2]  + ways) % MOD;
                next[ng1][g2] = (next[ng1][g2] + ways) % MOD;
                next[g1][ng2] = (next[g1][ng2] + ways) % MOD;
            }
        }

        dp = next;
    }

    let total = 0;
    for (let g = 1; g <= maxVal; g++) total = (total + dp[g][g]) % MOD;
    return total;
};
```