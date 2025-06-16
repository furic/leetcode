const maximumDifference = (nums: number[]): number => {
    let ans = -1;
    for (let i = 0, j = 1; j < nums.length; j++) {
        if (nums[j] > nums[i]) {
            ans = Math.max(ans, nums[j] - nums[i]);
        } else {
            i = j;
        }
    }
    return ans;
};