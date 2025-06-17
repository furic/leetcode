const MOD: bigint = BigInt(1e9 + 7);
const MAX: number = 1e5;

const fact: bigint[] = new Array(MAX).fill(0n);
const invFact: bigint[] = new Array(MAX).fill(0n);

const qpow = (x: number | bigint, n: number | bigint): bigint => {
    x = BigInt(x);
    n = BigInt(n);
    let res = 1n;
    while (n > 0n) {
        if (n & 1n) res = (res * x) % MOD;
        x = (x * x) % MOD;
        n >>= 1n;
    }
    return res;
};

const comb = (n: number, m: number): bigint => {
    if (m < 0 || m > n) return 0n;
    return (((fact[n] * invFact[m]) % MOD) * invFact[n - m]) % MOD;
};

const countGoodArrays = (n: number, m: number, k: number): number => {
    if (fact[0] === 0n) {
        fact[0] = 1n;
        for (let i = 1; i < MAX; i++) {
            fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
        }
        invFact[MAX - 1] = qpow(fact[MAX - 1], MOD - 2n);
        for (let i = MAX - 2; i >= 0; i--) {
            invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
        }
    }

    let res = comb(n - 1, k);
    res = (res * BigInt(m)) % MOD;
    res = (res * qpow(m - 1, n - k - 1)) % MOD;
    return Number(res);
};