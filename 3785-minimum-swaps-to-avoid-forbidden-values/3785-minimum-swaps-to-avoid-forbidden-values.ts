const minSwaps = (nums: number[], forbidden: number[]): number => {
    const n = nums.length;

    const count = new Map<number, number>();
    const forbiddenCount = new Map<number, number>();
    const badCount = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        count.set(nums[i], (count.get(nums[i]) || 0) + 1);
        forbiddenCount.set(
            forbidden[i],
            (forbiddenCount.get(forbidden[i]) || 0) + 1
        );
        if (nums[i] === forbidden[i]) {
            badCount.set(nums[i], (badCount.get(nums[i]) || 0) + 1);
        }
    }

    for (const [v, c] of count) {
        if (c > n - (forbiddenCount.get(v) || 0)) return -1;
    }

    let totalBad = 0;
    let maxSame = 0;
    for (const c of badCount.values()) {
        totalBad += c;
        maxSame = Math.max(maxSame, c);
    }

    return Math.max(Math.ceil(totalBad / 2), maxSame);
};
