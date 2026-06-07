function leftRightDifference(nums: number[]): number[] {
    let prefix = 0;
    let suffix = nums.reduce((a, b) => a + b, 0);
    const res: number[] = [];
    for (const i of nums) {
        prefix += i;
        res.push(Math.abs(prefix - suffix));
        suffix -= i;
    }
    return res;
};