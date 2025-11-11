function findMaxForm(strs: string[], m: number, n: number): number {
    let dp = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1))
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i], zeros = 0, ones = 0
        for (let j = 0; j < str.length; j++)
            str.charAt(j) === "0" ? zeros++ : ones++
        for (let j = m; j >= zeros; j--)
            for (let k = n; k >= ones; k--)
                dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1)
    }
    return dp[m][n]
};