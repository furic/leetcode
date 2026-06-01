function minimumCost(cost: number[]): number {
    cost.sort((a, b) => a - b);
    let total = 0;
    let take = 0;
    for (let i = cost.length - 1; i >= 0; i--) {
        if (take === 2) {
            take = 0;
        } else {
            total += cost[i];
            take++;
        }
    }
    return total;
};