const maxSum = (nums: number[]): number => {
    const positiveNumsSet = new Set(nums.filter((num) => num > 0));
    return positiveNumsSet.size
        ? [...positiveNumsSet].reduce((a, b) => a + b, 0)
        : Math.max(...nums);
}