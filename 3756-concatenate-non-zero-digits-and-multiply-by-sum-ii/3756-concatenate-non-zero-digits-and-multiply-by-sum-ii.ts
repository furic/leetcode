const MOD = 1_000_000_007n;
const MAX_N = 100_001;

// Precompute powers of 10 mod MOD for prefix extraction
const pow10: bigint[] = new Array(MAX_N);
pow10[0] = 1n;
for (let i = 1; i < MAX_N; i++)
    pow10[i] = pow10[i - 1] * 10n % MOD;

const sumAndMultiply = (s: string, queries: number[][]): number[] => {
    const n = s.length;

    // Prefix arrays (1-indexed):
    // digitSum[i]  = sum of digits in s[0..i-1]
    // concatVal[i] = value of non-zero digits in s[0..i-1] concatenated, mod MOD
    // nonZeroCount[i] = count of non-zero digits in s[0..i-1]
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

        // Extract x = concatVal[hi] - concatVal[l] * 10^nonZeroLen (mod MOD)
        const x   = (concatVal[hi] - concatVal[l] * pow10[nonZeroLen] % MOD + MOD) % MOD;
        const sum = BigInt(digitSum[hi] - digitSum[l]);

        return Number(x * sum % MOD);
    });
};