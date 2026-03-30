# Binomial Coefficient Vandermonde Identity | 16 Lines | O(n log MOD) | 240ms

# Intuition
The person at `pos` sees someone to their left only if that person faces 'L', and someone to their right only if they face 'R'. The count of visible people equals the number of left-neighbors choosing 'L' plus right-neighbors choosing 'R'. The person at `pos` themselves can face either direction without affecting visibility — contributing a ×2 factor.

# Approach
- Let `L = pos` (people to the left) and `R = n - 1 - pos` (people to the right).
- We need to count assignments where exactly `j` left-neighbors choose 'L' and `k - j` right-neighbors choose 'R', summed over all valid `j`:
  $$\sum_{j=0}^{k} \binom{L}{j} \binom{R}{k-j} = \binom{L+R}{k} = \binom{n-1}{k}$$
  by **Vandermonde's identity** — choosing `k` visible people from `n-1` total is equivalent to the sum of split choices.
- The person at `pos` can independently choose 'L' or 'R', multiplying the count by 2.
- **Result:** `2 × C(n-1, k) mod (10^9 + 7)`.
- `C(n, k)` is computed using precomputed factorials and modular inverses via Fermat's little theorem (`x^(MOD-2) mod MOD`).

# Complexity
- Time complexity: $$O(n + \log \text{MOD})$$ — $$O(n)$$ to build the factorial table, $$O(\log \text{MOD})$$ for each modular inverse call (two per `nCk`).

- Space complexity: $$O(n)$$ — for the factorial array.

# Code
```typescript []
const countVisiblePeople = (n: number, pos: number, k: number): number => {
    const MOD = 1_000_000_007n;

    const size = n;
    const factorials = new Array<bigint>(size).fill(1n);
    for (let i = 1; i < size; i++) factorials[i] = factorials[i - 1] * BigInt(i) % MOD;

    const modpow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let result = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) result = result * base % mod;
            base = base * base % mod;
            exp /= 2n;
        }
        return result;
    };

    const modInverse = (x: bigint): bigint => modpow(x, MOD - 2n, MOD);

    const nCk = (total: number, choose: number): bigint => {
        if (choose < 0 || choose > total) return 0n;
        return factorials[total] * modInverse(factorials[choose]) % MOD
                                 * modInverse(factorials[total - choose]) % MOD;
    };

    return Number(2n * nCk(n - 1, k) % MOD);
};
```