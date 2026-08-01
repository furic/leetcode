const predictTheWinner = (nums: number[]): boolean => {
    const n = nums.length;
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) dp[i][i] = nums[i];

    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;
            dp[l][r] = Math.max(
                nums[l] - dp[l + 1][r],
                nums[r] - dp[l][r - 1],
            );
        }
    }

    return dp[0][n - 1] >= 0;
};