const absDifference = (nums: number[], k: number): number =>
    nums
        .sort((a, b) => a - b)
        .slice(-k)
        .reduce((sum, val, i) => sum + val - nums[i], 0);
