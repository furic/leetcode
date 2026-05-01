const maxRotateFunction = (nums: number[]): number => {
    const n = nums.length;
    const totalSum = nums.reduce((sum, val) => sum + val, 0);

    // F(k) = F(k-1) + totalSum - n * nums[n-k]
    let rotatedF = nums.reduce((sum, val, i) => sum + i * val, 0);
    let maxF = rotatedF;

    for (let k = 1; k < n; k++) {
        rotatedF += totalSum - n * nums[n - k];
        maxF = Math.max(maxF, rotatedF);
    }

    return maxF;
};