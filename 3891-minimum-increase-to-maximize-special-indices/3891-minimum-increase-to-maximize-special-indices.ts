const minIncrease = (nums: number[]): number => {
    const n = nums.length;

    // Cost to make index i special: must exceed both neighbours
    const costToMakeSpecial = (i: number): number => {
        const neighbourMax = Math.max(nums[i - 1], nums[i + 1]);
        return neighbourMax >= nums[i] ? neighbourMax - nums[i] + 1 : 0;
    };

    // Odd length: all interior odd indices can be special simultaneously (no overlap)
    if (n % 2 !== 0) {
        let total = 0;
        for (let i = 1; i < n - 1; i += 2) total += costToMakeSpecial(i);
        return total;
    }

    // Even length: special indices can't all be odd — sliding window of k odd indices,
    // one even index replaces one odd index, find the cheapest swap
    const k = (n - 2) / 2;
    let windowCost = 0;
    for (let i = 0; i < k; i++) windowCost += costToMakeSpecial(2 * i + 1);

    let minCost = windowCost;
    for (let i = k - 1; i >= 0; i--) {
        windowCost = windowCost - costToMakeSpecial(2 * i + 1) + costToMakeSpecial(2 * i + 2);
        if (windowCost < minCost) minCost = windowCost;
    }

    return minCost;
};