function minOperations(nums: number[], k: number): number {
    const total = nums.reduce((a, b) => a + b, 0);
    return total % k;
};