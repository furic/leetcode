# Prefix Concat Value + Digit Sum | 20 Lines | O(m + q) | 147ms

# Intuition
We need to efficiently extract the concatenated non-zero number `x` and its digit sum for arbitrary substrings. Both can be computed with prefix arrays and answered in O(1) per query.

# Approach
- **Precompute (1-indexed):**
  - `digitSum[i]` — sum of all digits in `s[0..i-1]` (same whether zero or not, since zero contributes 0).
  - `concatVal[i]` — the number formed by concatenating only non-zero digits from `s[0..i-1]`, modulo `MOD`.
  - `nonZeroCount[i]` — count of non-zero digits in `s[0..i-1]`.
- **For query `[l, r]`:**
  - `nonZeroLen = nonZeroCount[r+1] - nonZeroCount[l]` — how many non-zero digits are in the substring.
  - `x = concatVal[r+1] - concatVal[l] * 10^nonZeroLen (mod MOD)` — subtract the prefix contribution, scaled by how many digits the suffix non-zero digits occupy.
  - `sum = digitSum[r+1] - digitSum[l]` — this equals the digit sum of `x` since zeros contribute 0.
  - Answer: `x * sum % MOD`.
- **Powers of 10** are precomputed up to `MAX_N` for O(1) scaling.

# Complexity
- Time complexity: $$O(m + q)$$ — O(m) precomputation, O(1) per query.

- Space complexity: $$O(m)$$ — three prefix arrays and the powers-of-10 table.

# Code
```typescript []
const MOD = 1_000_000_007n;
const MAX_N = 100_001;

const pow10: bigint[] = new Array(MAX_N);
pow10[0] = 1n;
for (let i = 1; i < MAX_N; i++)
    pow10[i] = pow10[i - 1] * 10n % MOD;

const sumAndMultiply = (s: string, queries: number[][]): number[] => {
    const n = s.length;

    const digitSum     = new Array<number>(n + 1).fill(0);
    const concatVal    = new Array<bigint>(n + 1).fill(0n);
    const nonZeroCount = new Array<number>(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        const d = s.charCodeAt(i) - 48;
        digitSum[i + 1]     = digitSum[i] + d;
        concatVal[i + 1]    = d > 0 ? (concatVal[i] * 10n + BigInt(d)) % MOD : concatVal[i];
        nonZeroCount[i + 1] = nonZeroCount[i] + (d > 0 ? 1 : 0);
    }

    return queries.map(([l, r]) => {
        const hi = r + 1;
        const nonZeroLen = nonZeroCount[hi] - nonZeroCount[l];
        const x   = (concatVal[hi] - concatVal[l] * pow10[nonZeroLen] % MOD + MOD) % MOD;
        const sum = BigInt(digitSum[hi] - digitSum[l]);
        return Number(x * sum % MOD);
    });
};
```