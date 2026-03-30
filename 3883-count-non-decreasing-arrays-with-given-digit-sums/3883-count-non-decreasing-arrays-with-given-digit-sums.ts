const countArrays = (digitSum: number[]): number => {
    const MOD = 1_000_000_007n;

    const getDigitSum = (n: number): number => {
        let sum = 0;
        while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
        return sum;
    };

    // Group numbers [0, 5000] by digit sum (naturally sorted ascending)
    const numbersByDigitSum = new Map<number, number[]>();
    for (let v = 0; v <= 5000; v++) {
        const s = getDigitSum(v);
        if (!numbersByDigitSum.has(s)) numbersByDigitSum.set(s, []);
        numbersByDigitSum.get(s)!.push(v);
    }

    const groups = digitSum.map(s => numbersByDigitSum.get(s) ?? []);
    if (groups.some(g => g.length === 0)) return 0;

    // dp[j] = number of valid arrays ending at current position with value groups[i][j]
    let dp = new Array<bigint>(groups[0].length).fill(1n);

    for (let i = 1; i < digitSum.length; i++) {
        const prevGroup = groups[i - 1];
        const currGroup = groups[i];

        // Prefix sums over previous dp
        const prefixSum = new Array<bigint>(prevGroup.length + 1).fill(0n);
        for (let k = 0; k < prevGroup.length; k++) {
            prefixSum[k + 1] = (prefixSum[k] + dp[k]) % MOD;
        }

        // Two-pointer: both groups sorted, so ptr only moves forward
        const newDp = new Array<bigint>(currGroup.length).fill(0n);
        let ptr = 0;
        for (let j = 0; j < currGroup.length; j++) {
            while (ptr < prevGroup.length && prevGroup[ptr] <= currGroup[j]) ptr++;
            newDp[j] = prefixSum[ptr]; // sum of dp[k] for all k where prevGroup[k] <= currGroup[j]
        }

        dp = newDp;
    }

    return Number(dp.reduce((sum, ways) => (sum + ways) % MOD, 0n));
};