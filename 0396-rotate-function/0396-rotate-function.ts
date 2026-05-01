function maxRotateFunction(nums: number[]): number {
    const F = (arr: number[]): number => {
        let f = 0;
        for (let i = 0; i < arr.length; i++) {
            f += i * arr[i];
        }
        return f;
    };

    const n = nums.length;

    let total = 0;
    for (const x of nums) total += x;

    const dp: number[] = [F(nums)];

    for (let i = 1; i < n; i++) {
        const curr = dp[i - 1] + total - n * nums[n - i];
        dp.push(curr);
    }

    return Math.max(...dp);
}