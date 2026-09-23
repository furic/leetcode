const minOperations = (nums: number[], x: number): number => {
    const total = nums.reduce((a, b) => a + b, 0);
    const target = total - x;

    if (target < 0) return -1;
    if (target === 0) return nums.length;

    let left = 0, maxMidLen = -1, windowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];
        while (windowSum > target) windowSum -= nums[left++];
        if (windowSum === target) maxMidLen = Math.max(maxMidLen, right - left + 1);
    }

    return maxMidLen >= 0 ? nums.length - maxMidLen : -1;
};