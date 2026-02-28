function concatenatedBinary(n: number): number {
    const MOD = 1000000007n;
    let res = 0n;

    for (let i = 1n; i <= BigInt(n); i++) {
        const bits = i.toString(2).length;
        res = ((res << BigInt(bits)) + i) % MOD;
    }

    return Number(res);
};