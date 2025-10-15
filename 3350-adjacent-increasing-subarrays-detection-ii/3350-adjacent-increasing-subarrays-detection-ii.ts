function maxIncreasingSubarrays(nums: number[]): number {
    const n = nums.length;
    let cnt = 1,
        precnt = 0,
        ans = 0;
    for (let i = 1; i < n; ++i) {
        if (nums[i] > nums[i - 1]) {
            ++cnt;
        } else {
            precnt = cnt;
            cnt = 1;
        }
        ans = Math.max(ans, Math.min(precnt, cnt));
        ans = Math.max(ans, Math.floor(cnt / 2));
    }
    return ans;
}