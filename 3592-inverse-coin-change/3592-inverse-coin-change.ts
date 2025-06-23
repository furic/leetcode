const findCoins = (numWays: number[]): number[] => {
    const n = numWays.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    const coins: number[] = [];

    for (let c = 1; c <= n; c++) {
        const target = numWays[c - 1];
        if (dp[c] === target) {
            continue;
        } else if (dp[c] + 1 === target) {
            coins.push(c);
            for (let i = c; i <= n; i++) {
                dp[i] += dp[i - c];
            }
        } else {
            return [];
        }
    }

    return coins;
};