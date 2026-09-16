# Stars and Bars Closed Form C(n+k-1, 2k) | 18 Lines | O(k log MOD) | 0ms

# Intuition
The problem has a beautiful combinatorial structure: any valid configuration of k non-overlapping segments (with shared endpoints allowed) can be bijected to a selection of 2k items from n+k-1, giving the closed form `C(n+k-1, 2k)`.

# Approach
- **Combinatorial reduction:** Apply a change of variables to the segment endpoints. For k segments sharing endpoints freely, we can encode each configuration by its "gaps" between and within segments. Stars and bars on these gaps yields `C(n+k-1, 2k)`.
- **Verification:** `n=4, k=2` → `C(5, 4) = 5` ✓; `n=3, k=1` → `C(3, 2) = 3` ✓.
- **Modular computation:** Compute `C(n+k-1, 2k)` as `numerator / denominator` mod `10^9 + 7`:
  - `numerator = (n+k-1) × (n+k-2) × ... × (n-k)` — the top `2k` terms.
  - `denominator = (2k)!`
  - Use Fermat's little theorem for the modular inverse: `denominator^(MOD-2) mod MOD`.
- All arithmetic is done in `BigInt` to avoid precision loss.

# Complexity
- Time complexity: $$O(k \log \text{MOD})$$ — the accumulation loop is $$O(k)$$; `modPow` is $$O(\log \text{MOD})$$. Since $$k \leq n \leq 1000$$ and $$\log \text{MOD} \approx 30$$, this is effectively $$O(k)$$.

- Space complexity: $$O(1)$$ — only scalar BigInt variables.

# Code
```typescript []
const numberOfSets = (n: number, k: number): number => {
    const MOD = 1_000_000_007n;

    const modPow = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        while (exp > 0n) {
            if (exp & 1n) result = result * base % MOD;
            base = base * base % MOD;
            exp >>= 1n;
        }
        return result;
    };

    let numerator = 1n, denominator = 1n;
    for (let i = 1; i <= 2 * k; i++) {
        numerator   = numerator   * BigInt(n + k - i) % MOD;
        denominator = denominator * BigInt(i)         % MOD;
    }

    return Number(numerator * modPow(denominator, MOD - 2n) % MOD);
};
```