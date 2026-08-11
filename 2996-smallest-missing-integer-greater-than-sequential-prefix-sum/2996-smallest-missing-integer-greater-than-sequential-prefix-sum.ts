const missingInteger = (nums: number[]): number => {
    const seen = new Set(nums);
    let sum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] + 1) break;
        sum += nums[i];
    }

    while (seen.has(sum)) sum++;
    return sum;
};