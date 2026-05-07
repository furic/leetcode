const maxValue = (nums: number[]): number[] => {
    const n = nums.length;

    const prefixMax = new Array<number>(n);
    prefixMax[0] = nums[0];
    for (let i = 1; i < n; i++)
        prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);

    const suffixMin = new Array<number>(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--)
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);

    // From i, we can reach any larger value to the left (via suffix jumps)
    // only if there's a smaller value to the right to "step through" first.
    // prefixMax[i] > suffixMin[i+1] means such a path exists.
    const result = new Array<number>(n);
    result[n - 1] = prefixMax[n - 1];
    for (let i = n - 2; i >= 0; i--)
        result[i] = prefixMax[i] > suffixMin[i + 1] ? result[i + 1] : prefixMax[i];

    return result;
};