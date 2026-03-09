# 2D DP + Prefix Sum Sliding Window | 38 Lines | O(zero × one) | 3ms

# Intuition
We build stable arrays block by block, alternating between runs of zeros and ones. Instead of tracking exact run lengths (which would add a third dimension), we note that the "no run longer than `limit`" constraint can be enforced by summing over the last 1 to `limit` blocks added — a sliding window over a prefix sum.

# Approach
- **State definition:**
  - `dp0[z][o]` = number of stable arrays using exactly `z` zeros and `o` ones, whose last block is a zero-block.
  - `dp1[z][o]` = same, but ending in a one-block.
  - A "block" is a maximal run of the same digit; its length can range from `1` to `limit`.
- **Transitions:**
  - To compute `dp0[z][o]`: we append a zero-block of size `k` (1 ≤ k ≤ limit) to any array ending in a one-block. This means summing `dp1[z-k][o]` for k = 1..limit — a sliding window of size `limit` over the `z` dimension of `dp1`.
  - To compute `dp1[z][o]`: symmetrically, sum `dp0[z][o-k]` for k = 1..limit — sliding window over the `o` dimension of `dp0`.
- **Prefix sums to achieve O(1) window queries:**
  - `pref1[z][o]` = prefix sum of `dp1[0..z][o]` (cumulative over the `z` axis for fixed `o`).
  - `pref0[z][o]` = prefix sum of `dp0[z][0..o]` (cumulative over the `o` axis for fixed `z`).
  - Sliding window sum of `dp1[z-limit..z-1][o]` = `pref1[z-1][o] - pref1[z-limit-1][o]`.
  - Same pattern applies for `dp0` along the `o` axis.
- **Seed:** A dummy `dp0[0][0] = dp1[0][0] = 1` bootstraps the first zero-block or one-block respectively.
- **Flat arrays** with stride `one + 1` avoid 2D array overhead; `Uint32Array` handles implicit mod via overflow truncation — but we still apply explicit `% MOD` to stay within 32-bit safe range.
- **Answer:** `(dp0[zero][one] + dp1[zero][one]) % MOD` — arrays ending in either a zero-block or one-block.

# Complexity
- Time complexity: $$O(\text{zero} \times \text{one})$$ — each cell is computed in $$O(1)$$ using prefix sums; no inner loop over `k`.

- Space complexity: $$O(\text{zero} \times \text{one})$$ — four flat arrays of size `(zero+1) × (one+1)`.

# Code
```typescript []
const numberOfStableArrays = (zero: number, one: number, limit: number): number => {
    const MOD = 1_000_000_007;
    const stride = one + 1;

    const dp0 = new Uint32Array((zero + 1) * stride);
    const dp1 = new Uint32Array((zero + 1) * stride);
    const pref1 = new Uint32Array((zero + 1) * stride);
    const pref0 = new Uint32Array((zero + 1) * stride);

    dp0[0] = 1;
    dp1[0] = 1;

    for (let z = 0; z <= zero; z++) {
        const zOff      = z * stride;
        const prevZOff  = (z - 1) * stride;
        const limitZOff = (z - limit - 1) * stride;

        for (let o = 0; o <= one; o++) {
            const idx = zOff + o;

            if (z === 0 && o === 0) {
                pref1[idx] = 1;
                pref0[idx] = 1;
                continue;
            }

            if (z > 0) {
                let val = pref1[prevZOff + o];
                if (z > limit) val = (val - pref1[limitZOff + o] + MOD) % MOD;
                dp0[idx] = val;
            }

            if (o > 0) {
                let val = pref0[idx - 1];
                if (o > limit) val = (val - pref0[idx - limit - 1] + MOD) % MOD;
                dp1[idx] = val;
            }

            pref1[idx] = z > 0 ? (dp1[idx] + pref1[prevZOff + o]) % MOD : dp1[idx];
            pref0[idx] = o > 0 ? (dp0[idx] + pref0[idx - 1])     % MOD : dp0[idx];
        }
    }

    return (dp0[zero * stride + one] + dp1[zero * stride + one]) % MOD;
};
```