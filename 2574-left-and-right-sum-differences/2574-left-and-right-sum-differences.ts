const leftRightDifference = (nums: number[]): number[] => {
    let leftSum = 0;
    let rightSum = nums.reduce((a, b) => a + b, 0);
    const result: number[] = [];

    for (const num of nums) {
        leftSum += num;
        result.push(Math.abs(leftSum - rightSum));
        rightSum -= num;
    }

    return result;
};