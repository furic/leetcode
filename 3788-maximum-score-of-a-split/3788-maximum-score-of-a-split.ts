const maximumScore = (nums: number[]): number => {
    const n = nums.length;
    const prefixSum: number[] = [];
    const suffixMin: number[] = [];

    for (let i = 0; i < n - 1; i++) {
        prefixSum[i] = (prefixSum[i - 1] || 0) + nums[i];
    }

    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i + 1] || Infinity, nums[i + 1]);
    }

    let ans = -Infinity;
    for (let i = 0; i < n - 1; i++) {
        ans = Math.max(ans, prefixSum[i] - suffixMin[i]);
    }

    return ans;
};
