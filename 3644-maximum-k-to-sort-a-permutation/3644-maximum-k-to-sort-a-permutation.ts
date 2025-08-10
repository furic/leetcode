const sortPermutation = (nums: number[]): number => {
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) continue;
        const k = nums[i] & i;
        // if (res === -1) {
        //     res = k;
        // } else if (k < res) {
        //     return 0;
        // }
        // const iIndex = nums.indexOf(i);
        res = res & k;
        // [nums[i], nums[iIndex]] = [nums[iIndex], nums[i]];
    }
    return res === Number.MAX_SAFE_INTEGER ? 0 : res;
};