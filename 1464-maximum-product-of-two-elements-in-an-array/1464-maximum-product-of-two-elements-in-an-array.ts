function maxProduct(nums: number[]): number {
    nums.sort((a, b) => a - b);

    const n = nums.length;
    return (nums[n - 1] - 1) * (nums[n - 2] - 1);
};