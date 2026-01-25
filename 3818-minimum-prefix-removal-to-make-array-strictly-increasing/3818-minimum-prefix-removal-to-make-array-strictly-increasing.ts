const minimumPrefixLength = (nums: number[]): number => {
    let answer = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) answer = i;
    }
    return answer;
};