const concatenatedBinary = (n: number): number => {
    const MOD = 1_000_000_007n;
    let result = 0n;

    for (let i = 1n; i <= BigInt(n); i++) {
        const bitLength = BigInt(i.toString(2).length);
        result = ((result << bitLength) + i) % MOD;
    }

    return Number(result);
};