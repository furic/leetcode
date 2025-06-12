const maxAdjacentDistance = (nums: number[]): number =>
    nums.reduce((acc, num, i) => Math.max(acc, Math.abs(num - nums[(i + 1) % nums.length])), 0);