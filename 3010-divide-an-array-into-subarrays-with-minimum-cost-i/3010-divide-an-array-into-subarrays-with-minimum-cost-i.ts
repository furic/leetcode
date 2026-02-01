function minimumCost(nums: number[]) {
    const first = nums[0], min = Math.min;
    let min1 = Infinity, min2 = min1;
    for (let i = 1, n = nums.length; i < n; i++) {
        if (nums[i] < min2) min1 = min2, min2 = nums[i];
        else if (nums[i] < min1) min1 = nums[i];
    }
    return first + min1 + min2;
}