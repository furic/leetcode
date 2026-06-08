const leftRightDifference = (nums: number[]): number[] => {
    let leftSum = 0;
    let rightSum = nums.reduce((a, b) => a + b, 0);

    return nums.map(num => {
        rightSum -= num;
        const diff = Math.abs(leftSum - rightSum);
        leftSum += num;
        return diff;
    });
};