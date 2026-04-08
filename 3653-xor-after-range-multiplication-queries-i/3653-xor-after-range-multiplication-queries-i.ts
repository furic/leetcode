const xorAfterQueries = (nums: number[], queries: number[][]): number => {
    const MOD = 1_000_000_007;

    for (const [left, right, step, multiplier] of queries) {
        for (let i = left; i <= right; i += step) {
            nums[i] = nums[i] * multiplier % MOD;
        }
    }

    let result = 0;
    for (const num of nums) result ^= num;

    return result;
};