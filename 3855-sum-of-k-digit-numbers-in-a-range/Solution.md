# Repunit Formula + Modular Arithmetic | 16 Lines | O(log k) | 6ms

# Intuition
Each digit position contributes independently to the total sum. By symmetry, every digit in range `[l, r]` appears equally often across all positions, so we can factor the sum into: the digit sum × how many ways to fill the other positions × the positional place value sum.

# Approach
- **Key variables:**
  - `digitCount = r - l + 1` — number of choices per digit position.
  - `digitSum = sum of l..r = (r - l + 1) × (l + r) / 2` — sum of all digit choices.
- **Contribution per position:** Fix one position at place value `10^p`. Each digit value `d` in `[l, r]` appears `digitCount^(k-1)` times at that position (free choice for all other `k-1` positions). So this position contributes `digitSum × digitCount^(k-1) × 10^p` to the total.
- **Sum across all k positions:** Summing `10^p` for `p = 0` to `k-1` gives the geometric series `(10^k - 1) / 9`, which is the **k-digit repunit** (111...1 with k ones).
- **Final formula:** `total = digitSum × digitCount^(k-1) × (10^k - 1) / 9 (mod 10^9 + 7)`.
- Division by `9` under modular arithmetic is done via modular inverse: `modinv(9, MOD) = modpow(9, MOD - 2, MOD)` using Fermat's little theorem (valid since MOD is prime).
- `modpow` uses fast exponentiation (square-and-multiply) to compute `digitCount^(k-1)` and `10^k` in `O(log k)` time.
- All arithmetic is done in `BigInt` to avoid precision loss, converted to `Number` only at the end.

# Complexity
- Time complexity: $$O(\log k)$$ — dominated by the two `modpow` calls, each taking $$O(\log k)$$ multiplications.

- Space complexity: $$O(\log k)$$ — stack and intermediate BigInt values during exponentiation.

# Code
```typescript []
const sumOfNumbers = (l: number, r: number, k: number): number => {
    const MOD = 1_000_000_007n;

    const modpow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let result = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) result = result * base % mod;
            base = base * base % mod;
            exp >>= 1n;
        }
        return result;
    };

    const modinv = (a: bigint, mod: bigint): bigint => modpow(a, mod - 2n, mod);

    const digitCount = BigInt(r - l + 1);
    const digitSum = BigInt((r - l + 1) * (l + r) / 2);
    const bigK = BigInt(k);

    const choicesForOthers = modpow(digitCount, bigK - 1n, MOD);
    const repunitK = (modpow(10n, bigK, MOD) - 1n + MOD) % MOD * modinv(9n, MOD) % MOD;

    return Number(digitSum % MOD * choicesForOthers % MOD * repunitK % MOD);
};
```