const findValidElements = (nums: number[]): number[] => {
    const n = nums.length;

    const prefixMax = new Array<number>(n);
    prefixMax[0] = -Infinity;
    for (let i = 1; i < n; i++) prefixMax[i] = Math.max(prefixMax[i - 1], nums[i - 1]);

    const suffixMax = new Array<number>(n);
    suffixMax[n - 1] = -Infinity;
    for (let i = n - 2; i >= 0; i--) suffixMax[i] = Math.max(suffixMax[i + 1], nums[i + 1]);

    return nums.filter((v, i) => v > prefixMax[i] || v > suffixMax[i]);
};
