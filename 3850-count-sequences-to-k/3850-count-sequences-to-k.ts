const countSequences = (nums: number[], k: number): number => {
    const factorize = (n: number): [number, number, number] | null => {
        let e2 = 0, e3 = 0, e5 = 0;
        while (n % 2 === 0) { e2++; n /= 2; }
        while (n % 3 === 0) { e3++; n /= 3; }
        while (n % 5 === 0) { e5++; n /= 5; }
        return n === 1 ? [e2, e3, e5] : null;
    };

    const targetExponents = factorize(k);
    if (!targetExponents) return 0;
    const [targetE2, targetE3, targetE5] = targetExponents;

    const encode = (e2: number, e3: number, e5: number): string => `${e2},${e3},${e5}`;

    let dp = new Map<string, number>();
    dp.set(encode(0, 0, 0), 1);

    for (const num of nums) {
        const [d2, d3, d5] = factorize(num)!;
        const nextDp = new Map<string, number>();

        for (const [state, count] of dp) {
            const [e2, e3, e5] = state.split(',').map(Number);

            const skipKey = state;
            const multiplyKey = encode(e2 + d2, e3 + d3, e5 + d5);
            const divideKey = encode(e2 - d2, e3 - d3, e5 - d5);

            nextDp.set(skipKey, (nextDp.get(skipKey) ?? 0) + count);
            nextDp.set(multiplyKey, (nextDp.get(multiplyKey) ?? 0) + count);
            nextDp.set(divideKey, (nextDp.get(divideKey) ?? 0) + count);
        }

        dp = nextDp;
    }

    return dp.get(encode(targetE2, targetE3, targetE5)) ?? 0;
};