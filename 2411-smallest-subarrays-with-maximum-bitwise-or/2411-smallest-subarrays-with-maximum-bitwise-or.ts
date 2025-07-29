function smallestSubarrays(nums: number[]): number[] {
    const n = nums.length;
    const pos: number[] = new Array(31).fill(-1);
    const ans: number[] = new Array(n);
    for (let i = n - 1; i >= 0; --i) {
        let j = i;
        for (let bit = 0; bit < 31; ++bit) {
            if (!(nums[i] & (1 << bit))) {
                if (pos[bit] !== -1) {
                    j = Math.max(j, pos[bit]);
                }
            } else {
                pos[bit] = i;
            }
        }
        ans[i] = j - i + 1;
    }
    return ans;
}