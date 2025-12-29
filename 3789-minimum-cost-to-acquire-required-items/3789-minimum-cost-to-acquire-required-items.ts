const minimumCost = (cost1: number, cost2: number, costBoth: number, need1: number, need2: number): number => {
    const case1 = cost1 * need1 + cost2 * need2;

    const minNeed = Math.min(need1, need2);
    const case2 = costBoth * minNeed + cost1 * (need1 - minNeed) + cost2 * (need2 - minNeed);

    const maxNeed = Math.max(need1, need2);
    const case3 = costBoth * maxNeed;

    return Math.min(case1, case2, case3);
};