function minMoves(nums: number[]): number {
    const maxVal = Math.max(...nums);
    const sum = nums.reduce((a, b) => a + b, 0);

    return maxVal * nums.length - sum;
};