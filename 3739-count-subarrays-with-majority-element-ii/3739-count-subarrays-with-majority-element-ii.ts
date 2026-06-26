function countMajoritySubarrays(nums: number[], target: number): number {
    const n = nums.length;
    const freq: number[] = Array(2 * n + 1).fill(0);

    freq[n] = 1;

    let idx = n;
    let res = 0;
    let pref = 0;

    for (const x of nums) {
        if (x === target) {
            pref += freq[idx];
            idx++;
        } else {
            idx--;
            pref -= freq[idx];
        }

        freq[idx]++;
        res += pref;
    }

    return res;
}