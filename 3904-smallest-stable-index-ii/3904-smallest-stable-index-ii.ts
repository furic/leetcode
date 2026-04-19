const firstStableIndex = (nums: number[], k: number): number => {
    const n = nums.length;

    const prefixMax = new Array<number>(n);
    prefixMax[0] = nums[0];
    for (let i = 1; i < n; i++) prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);

    const suffixMin = new Array<number>(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);

    for (let i = 0; i < n; i++) {
        if (prefixMax[i] - suffixMin[i] <= k) return i;
    }

    return -1;
};