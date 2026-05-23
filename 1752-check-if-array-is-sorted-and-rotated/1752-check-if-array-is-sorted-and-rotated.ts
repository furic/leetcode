const check = (nums: number[]): boolean =>
    nums.filter((n, i) => n > nums[(i + 1) % nums.length]).length <= 1;