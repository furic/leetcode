function sortPermutation(nums: number[]): number {
    let k = -1;  // all bits set: nothing misplaced yet
    for (let i = 0; i < nums.length; i++)
        if (nums[i] !== i) {  // this number has to move
            k &= nums[i];  // keep only the bits it shares
            if (k === 0) return 0;  // bits only disappear, so 0 stays 0
        }
    return Math.max(k, 0);  // -1 means nothing has to move
}