function predictTheWinner(nums: number[]): boolean {
    const n = nums.length;
    const dp: number[] = Array(n).fill(0);

    for (let left = n - 1; left >= 0; left--) {
        dp[left] = nums[left];

        for (let right = left + 1; right < n; right++) {
            dp[right] = Math.max(
                nums[left] - dp[right],
                nums[right] - dp[right - 1]
            );
        }
    }

    return dp[n - 1] >= 0;
}