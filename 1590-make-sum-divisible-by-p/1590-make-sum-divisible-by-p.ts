function minSubarray(nums: number[], p: number): number {
    let total = nums.reduce((a, b) => a + b, 0);
    let need = total % p;
    if (need === 0) return 0;

    let mp = new Map<number, number>();
    mp.set(0, -1);

    let prefix = 0;
    let res = nums.length;

    for (let i = 0; i < nums.length; i++) {
        prefix = (prefix + nums[i]) % p;
        let target = (prefix - need + p) % p;
        if (mp.has(target)) res = Math.min(res, i - mp.get(target)!);
        mp.set(prefix, i);
    }

    return res === nums.length ? -1 : res;
}