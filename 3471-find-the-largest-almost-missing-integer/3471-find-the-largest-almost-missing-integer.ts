const largestInteger = (nums: number[], k: number): number => {
    const n = nums.length;
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

    // Only elements that appear exactly once in nums can appear in exactly one subarray
    const unique = (x: number) => freq.get(x) === 1;

    if (k === n) return Math.max(...nums);

    // k=1: every element forms its own subarray — unique elements qualify
    // k>1: only endpoints can appear in exactly one subarray (only one window covers each end)
    const candidates = k === 1
        ? nums.filter(unique)
        : [nums[0], nums[n - 1]].filter(unique);

    return candidates.length ? Math.max(...candidates) : -1;
};