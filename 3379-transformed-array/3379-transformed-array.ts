function constructTransformedArray(nums: number[]): number[] {
    const n = nums.length;
    const ans = new Array(n);
    for (let i = 0; i < n; i++) {
        ans[i] = nums[((i + nums[i]) % n + n) % n];
    }
    return ans;
};