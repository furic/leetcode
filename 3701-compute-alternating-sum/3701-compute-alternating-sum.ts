const alternatingSum = (nums: number[]): number =>
    nums.reduce((sum, num, i) => sum + (i % 2 === 0 ? 1 : -1) * num, 0);