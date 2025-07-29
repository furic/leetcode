const maximumLength = (nums: number[], k: number): number => {
    const dp: number[][] = Array.from({ length: k }, () =>
        new Array(k).fill(0),
    );
    let res = 0;
    for (const num of nums) {
        const mod = num % k;
        for (let prev = 0; prev < k; prev++) {
            dp[prev][mod] = dp[mod][prev] + 1;
            res = Math.max(res, dp[prev][mod]);
        }
    }
    return res;
};