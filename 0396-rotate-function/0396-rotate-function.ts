const maxRotateFunction = (nums: number[]): number => {
    const n = nums.length;
    let totalSum = 0;
    let rotatedF = 0;

    for (let i = 0; i < n; i++) {
        totalSum += nums[i];
        rotatedF += i * nums[i];
    }

    let maxF = rotatedF;

    for (let k = 1; k < n; k++) {
        rotatedF += totalSum - n * nums[n - k]; // F(k) = F(k-1) + totalSum - n * nums[n-k]
        maxF = Math.max(maxF, rotatedF);
    }

    return maxF;
};