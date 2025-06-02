const checkEqualPartitions = (nums: number[], target: number): boolean => {
    const n = nums.length;
    const totalMasks = 1 << n;

    for (let mask = 1; mask < totalMasks - 1; mask++) {
        let prodA = 1, prodB = 1;
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                prodA *= nums[i];
            } else {
                prodB *= nums[i];
            }
        }
        if (prodA === target && prodB === target) return true;
    }

    return false;
};