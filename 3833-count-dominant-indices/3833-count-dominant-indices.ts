const dominantIndices = (nums: number[]): number => {
    const n = nums.length;
    let sum = nums[n - 1];
    let count = 0;
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] > sum / (n - i - 1)) count++;
        sum += nums[i];
    }
    return count;
};
