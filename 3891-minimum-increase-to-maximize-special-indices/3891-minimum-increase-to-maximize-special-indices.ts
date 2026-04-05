const minIncrease = (nums: number[]): number => {
    const n = nums.length;

    const costToMakeSpecial = (i: number): number =>
        Math.max(0, Math.max(nums[i - 1], nums[i + 1]) + 1 - nums[i]);

    // dp[skip] = [maxCount, minCost] where skip=0 means current index not selected
    let skip: [number, number] = [0, 0];
    let pick:  [number, number] = [-Infinity, 0]; // invalid until first index

    for (let i = 1; i <= n - 2; i++) {
        const cost = costToMakeSpecial(i);
        const newPick: [number, number] = [skip[0] + 1, skip[1] + cost];
        const newSkip: [number, number] = pick[0] > skip[0] || (pick[0] === skip[0] && pick[1] < skip[1])
            ? pick
            : skip;
        skip = newSkip;
        pick = newPick;
    }

    const [countSkip, costSkip] = skip;
    const [countPick, costPick] = pick;

    if (countPick > countSkip) return costPick;
    if (countSkip > countPick) return costSkip;
    return Math.min(costPick, costSkip);
};