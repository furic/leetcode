const minCost = (basket1: number[], basket2: number[]): number => {
    const fruitDelta = new Map<number, number>();
    let globalMin = Infinity;

    // Count the difference in fruit frequency between baskets
    for (const cost of basket1) {
        fruitDelta.set(cost, (fruitDelta.get(cost) ?? 0) + 1);
        globalMin = Math.min(globalMin, cost);
    }
    for (const cost of basket2) {
        fruitDelta.set(cost, (fruitDelta.get(cost) ?? 0) - 1);
        globalMin = Math.min(globalMin, cost);
    }

    // Collect extra fruits that need to be swapped
    const swapCandidates: number[] = [];
    for (const [fruitCost, count] of fruitDelta.entries()) {
        if (count % 2 !== 0) return -1; // Cannot balance
        for (let i = 0; i < Math.abs(count) / 2; i++) {
            swapCandidates.push(fruitCost);
        }
    }

    // Sort to prioritize cheaper swaps
    swapCandidates.sort((a, b) => a - b);

    // We only need to swap half of them (rest are mirrored)
    let totalCost = 0;
    for (let i = 0; i < swapCandidates.length / 2; i++) {
        const directSwapCost = swapCandidates[i];
        const doubleMinCost = 2 * globalMin;
        totalCost += Math.min(directSwapCost, doubleMinCost);
    }

    return totalCost;
};