const sortPermutation = (nums: number[]): number => {
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) continue;
        const k = nums[i] & i;
        res = res & k;
    }
    return res === Number.MAX_SAFE_INTEGER ? 0 : res;
};