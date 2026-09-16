const MOD = 1000000007n;

function modPow(base: bigint, exp: bigint): bigint {
    let result = 1n;

    while (exp > 0n) {
        if (exp & 1n) {
            result = result * base % MOD;
        }

        base = base * base % MOD;

        exp >>= 1n;
    }

    return result;
}

function numberOfSets(n: number, k: number): number {
    const N = BigInt(n + k - 1);
    let R = BigInt(2 * k);

    if (R > N - R) {
        R = N - R;
    }

    let numerator = 1n;
    let denominator = 1n;

    for (let i = 1n; i <= R; i++) {
        numerator = numerator * (N - R + i) % MOD;

        denominator = denominator * i % MOD;
    }

    const inverseDenominator = modPow(denominator, MOD - 2n);

    return Number(numerator * inverseDenominator % MOD);
}