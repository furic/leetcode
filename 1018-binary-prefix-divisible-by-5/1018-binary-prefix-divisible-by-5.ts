function prefixesDivBy5(nums: number[]): boolean[] {
    let n = 0;
    let res = Array(nums.length);

    for (let i = 0; i < nums.length; i += 1) {
        n = (n << 1 | nums[i]) % 5;
        res[i] = n === 0;
    }

    return res;
};