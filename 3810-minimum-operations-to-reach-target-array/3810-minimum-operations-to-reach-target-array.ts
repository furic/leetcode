const minOperations = (nums: number[], target: number[]): number => {
    const needsUpdate = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== target[i]) {
            needsUpdate.add(nums[i]);
        }
    }

    return needsUpdate.size;
};
