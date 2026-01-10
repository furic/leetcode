function minimumDeleteSum(s1: string, s2: string): number {
    let n1 = s1.length, n2 = s2.length;
    let dp: number[] = Array(n2 + 1).fill(0);

    for (let i = 1; i <= n1; i++) {
        let dp_new = [...dp];
        for (let j = 1; j <= n2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp_new[j] = s2.charCodeAt(j - 1) + dp[j - 1];
            } else {
                dp_new[j] = Math.max(dp[j], dp_new[j - 1]);
            }
        }
        dp = dp_new;
    }

    let total = 0;
    for (let c of s1) 
        total += c.charCodeAt(0);
    for (let c of s2) 
        total += c.charCodeAt(0);

    return total - 2 * dp[n2];
};