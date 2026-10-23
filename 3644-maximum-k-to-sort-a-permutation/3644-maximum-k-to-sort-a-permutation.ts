const sortPermutation = (nums: number[]): number => {
    let res = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            res &= i;
        }
    }
    return res === -1 ? 0 : res;
};