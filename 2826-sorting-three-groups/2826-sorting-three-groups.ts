function minimumOperations(nums: number[]): number {
    let ones = 0;
    let twos = 0;
    let threes = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            ones++;
        }
        if (nums[i] === 2) {
            twos = Math.max(ones, twos) + 1;
        }
        if (nums[i] === 3) {
            threes = Math.max(ones, twos, threes) + 1;
        }
    }
    return nums.length - Math.max(ones, twos, threes);
};