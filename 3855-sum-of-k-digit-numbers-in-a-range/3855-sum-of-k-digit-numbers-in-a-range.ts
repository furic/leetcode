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

    // Each position contributes: digitSum × count^(k-1) × 10^(position)
    // Total = digitSum × count^(k-1) × (10^k - 1) / 9
    const choicesForOthers = modpow(digitCount, bigK - 1n, MOD);
    const repunitK = (modpow(10n, bigK, MOD) - 1n + MOD) % MOD * modinv(9n, MOD) % MOD;

    return Number(digitSum % MOD * choicesForOthers % MOD * repunitK % MOD);
};