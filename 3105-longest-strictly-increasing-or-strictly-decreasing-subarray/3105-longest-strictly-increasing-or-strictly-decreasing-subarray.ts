const longestMonotonicSubarray = (nums: number[]): number => {
    let maxLen = 1, increasing = 1, decreasing = 1;

    for (let i = 1; i < nums.length; i++) {
        increasing = nums[i - 1] < nums[i] ? increasing + 1 : 1; // strictly increasing run ending at i
        decreasing = nums[i - 1] > nums[i] ? decreasing + 1 : 1; // strictly decreasing run ending at i
        maxLen = Math.max(maxLen, increasing, decreasing);
    }

    return maxLen;
};