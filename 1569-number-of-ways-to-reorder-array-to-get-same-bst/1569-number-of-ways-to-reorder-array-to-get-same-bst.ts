const numOfWays = (nums: number[]): number => {
    const MOD = 1_000_000_007n;
    const n = nums.length;

    const modPow = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        while (exp > 0n) {
            if (exp % 2n === 1n) result = result * base % MOD;
            base = base * base % MOD;
            exp /= 2n;
        }
        return result;
    };

    const factorial = new Array<bigint>(n + 1).fill(1n);
    for (let i = 1; i <= n; i++) factorial[i] = factorial[i - 1] * BigInt(i) % MOD;

    // Fermat's little theorem for n!^-1, then walk down: (i-1)!^-1 = i!^-1 * i
    const inverseFactorial = new Array<bigint>(n + 1).fill(1n);
    inverseFactorial[n] = modPow(factorial[n], MOD - 2n);
    for (let i = n; i >= 1; i--) inverseFactorial[i - 1] = inverseFactorial[i] * BigInt(i) % MOD;

    const choose = (total: number, pick: number): bigint =>
        factorial[total] * inverseFactorial[pick] * inverseFactorial[total - pick] % MOD;

    // Returns [subtree size, number of insertion orders that rebuild this subtree]
    const countWays = (values: number[]): [number, bigint] => {
        if (values.length <= 1) return [values.length, 1n];

        const root = values[0];
        const leftValues: number[] = [];
        const rightValues: number[] = [];
        for (let i = 1; i < values.length; i++) {
            if (values[i] < root) leftValues.push(values[i]);
            else rightValues.push(values[i]);
        }

        const [leftSize, leftWays] = countWays(leftValues);
        const [rightSize, rightWays] = countWays(rightValues);

        // Interleave the left and right orderings: C(leftSize + rightSize, leftSize)
        const ways = choose(leftSize + rightSize, leftSize) * leftWays % MOD * rightWays % MOD;

        return [1 + leftSize + rightSize, ways];
    };

    // Subtract 1 to exclude the original ordering itself
    return Number((countWays(nums)[1] - 1n + MOD) % MOD);
};