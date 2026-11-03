const minMoves = (nums: number[]): number => {
    let maxVal = nums[0];
    let sum = 0;

    for (const num of nums) {
        if (num > maxVal) maxVal = num;
        sum += num;
    }

    // Every element has to rise to the max, so the cost is the gap between
    // (max * n) and what we already have
    return maxVal * nums.length - sum;
};