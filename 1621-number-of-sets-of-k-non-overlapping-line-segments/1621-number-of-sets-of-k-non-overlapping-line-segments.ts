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

    // C(n + k - 1, 2k) via numerator/denominator accumulation
    let numerator = 1n, denominator = 1n;
    for (let i = 1; i <= 2 * k; i++) {
        numerator   = numerator   * BigInt(n + k - i) % MOD;
        denominator = denominator * BigInt(i)         % MOD;
    }

    return Number(numerator * modPow(denominator, MOD - 2n) % MOD);
};