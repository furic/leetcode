const maxAdjacentDistance = (nums: number[]): number => {
    let maxDifference = 0;
    for (let i = 0; i < nums.length; i++) {
        const diff = Math.abs(nums[i] - nums[(i + 1) % nums.length]);
        maxDifference = Math.max(maxDifference, diff);
    }
    return maxDifference;
};