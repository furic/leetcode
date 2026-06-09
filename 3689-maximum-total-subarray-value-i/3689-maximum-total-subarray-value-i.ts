function maxTotalValue(nums: number[], k: number): number {
    let min = nums[0],
        max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min) min = nums[i];
        else if (nums[i] > max) max = nums[i];
    }
    return (max - min) * k;
}