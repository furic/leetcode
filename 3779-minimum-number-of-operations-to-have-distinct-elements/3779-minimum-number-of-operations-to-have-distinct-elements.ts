const minOperations = (nums: number[]): number => {
    const n = nums.length;
    const set = new Set<number>();
    for (let i = n - 1; i >= 0; i--) {
        if (set.has(nums[i])) {
            return Math.ceil((i + 1) / 3);
        }
        set.add(nums[i]);
    }
    return 0;
};