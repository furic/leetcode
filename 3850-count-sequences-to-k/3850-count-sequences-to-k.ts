const countSequences = (nums: number[], k: number): number => {
    // Factorize x into prime exponents [e2, e3, e5] and remaining factor
    const factorize = (x: number): [number, number, number, number] => {
        let exp2 = 0, exp3 = 0, exp5 = 0;
        while (x % 2 === 0) { exp2++; x /= 2; }
        while (x % 3 === 0) { exp3++; x /= 3; }
        while (x % 5 === 0) { exp5++; x /= 5; }
        return [exp2, exp3, exp5, x];
    };

    // k must be expressible purely in terms of primes 2, 3, 5
    const [targetExp2, targetExp3, targetExp5, kRemainder] = factorize(k);
    if (kRemainder !== 1) return 0;

    // Pre-factorize all nums to avoid repeated work in DFS
    const numFactors = nums.map(x => {
        const [a, b, c] = factorize(x);
        return [a, b, c] as [number, number, number];
    });

    const memo = new Map<string, number>();

    // Track net prime exponent accumulators — multiply adds, divide subtracts, skip leaves unchanged
    // Goal: reach (targetExp2, targetExp3, targetExp5) after processing all nums
    const dfs = (i: number, acc2: number, acc3: number, acc5: number): number => {
        if (i === nums.length) {
            return acc2 === targetExp2 && acc3 === targetExp3 && acc5 === targetExp5 ? 1 : 0;
        }

        const key = `${i},${acc2},${acc3},${acc5}`;
        if (memo.has(key)) return memo.get(key)!;

        const [f2, f3, f5] = numFactors[i];

        const ways =
            dfs(i + 1, acc2 + f2, acc3 + f3, acc5 + f5) +  // multiply
            dfs(i + 1, acc2 - f2, acc3 - f3, acc5 - f5) +  // divide
            dfs(i + 1, acc2,       acc3,       acc5);        // skip

        memo.set(key, ways);
        return ways;
    };

    return dfs(0, 0, 0, 0);
};