const minAbsoluteDifference = (nums: number[]): number => {
    let minIndexDiff = 100;
    let lastOneIndex = -100, lastTwoIndex = -100;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) continue;
        if (nums[i] === 1) {
            minIndexDiff = Math.min(minIndexDiff, i - lastTwoIndex);
            lastOneIndex = i;
        } else {
            minIndexDiff = Math.min(minIndexDiff, i - lastOneIndex);
            lastTwoIndex = i;
        }
    }
    return minIndexDiff === 100 ? -1 : minIndexDiff;
};