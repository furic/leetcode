const stoneGameIII = (stoneValue: number[]): string => {
    let dp1 = 0, dp2 = 0, dp3 = 0;
    let suffixSum = 0;

    for (let i = stoneValue.length - 1; i >= 0; i--) {
        suffixSum += stoneValue[i];
        const best = suffixSum - Math.min(dp1, dp2, dp3);
        dp3 = dp2; dp2 = dp1; dp1 = best;
    }

    const alice = dp1;
    const bob   = suffixSum - dp1;

    if (alice > bob) return 'Alice';
    if (alice < bob) return 'Bob';
    return 'Tie';
};