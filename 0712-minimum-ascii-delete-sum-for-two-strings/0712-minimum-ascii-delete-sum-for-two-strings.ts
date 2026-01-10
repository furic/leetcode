function minimumDeleteSum(s1: string, s2: string): number {
    const n = s1.length
    const m = s2.length
    const dp = Array(m + 1).fill(Infinity)
    const prev = Array(m + 1).fill(Infinity)
    
    prev[0] = 0
    dp[0] = 0

    for (let j = 1; j <= m; j++) {
        prev[j] = prev[j - 1] + s2.charCodeAt(j - 1)
    }

    for (let i = 1; i <= n; i++) {
        dp[0] += s1.charCodeAt(i - 1)
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[j] = prev[j - 1]
            } else {
                dp[j] = Math.min(dp[j - 1] + s2.charCodeAt(j - 1), dp[j] + s1.charCodeAt(i - 1))
            }
        }

        for (let j = 0; j <= m; j++) {
            prev[j] = dp[j]
        }
    }

    return dp[m]
};