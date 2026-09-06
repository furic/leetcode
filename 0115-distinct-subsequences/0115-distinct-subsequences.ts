function numDistinct(s: string, t: string): number {
    const m: number = s.length;
    const n: number = t.length;

    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= m; i++) {
        for (let j = Math.min(i, n); j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n];
};