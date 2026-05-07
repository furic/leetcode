function maxValue(nums: number[]): number[] {
    const prefixMax = new Array<number>(nums.length);
    prefixMax[0] = nums[0];
    for (let i = 1;i < nums.length;i++) prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);

    const suffixMin = new Array<number>(nums.length);
    suffixMin[nums.length - 1] = nums[nums.length - 1];
    for (let i = nums.length - 2;i >= 0;i--) suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);

    const result = new Array<number>(nums.length);
    result[nums.length - 1] = prefixMax[nums.length - 1];
    for (let i = nums.length - 2;i >= 0;i--)
        result[i] = prefixMax[i] > suffixMin[i + 1] ? result[i + 1] : prefixMax[i];
    return result;
};
