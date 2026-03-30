const countVisiblePeople = (n: number, pos: number, k: number): number => {
    const MOD = 1_000_000_007n;

    // Precompute factorials and inverse factorials for C(n-1, k)
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