function xorAfterQueries(nums: number[], queries: number[][]): number {
    const mod = 1e9 + 7;

    for (const [l, r, k, v] of queries) {
        for (let i = l; i <= r; i += k) {
            nums[i] = (nums[i] * v) % mod;
        }
    }

    let res = 0;
    for (const x of nums) {
        res ^= x;
    }

    return res;
};