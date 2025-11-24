const prefixesDivBy5 = (nums: number[]): boolean[] => {
    let remainderMod5 = 0;
    const result: boolean[] = Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        // Build number bit by bit: shift left (×2) and add new bit, then mod 5
        // (n << 1 | nums[i]) is equivalent to (n * 2 + nums[i])
        remainderMod5 = (remainderMod5 * 2 + nums[i]) % 5;
        result[i] = remainderMod5 === 0;
    }

    return result;
};