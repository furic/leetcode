function minCost(arr: number[], brr: number[], k: number): number {
    const n = arr.length;
    let noSplitCost = 0;
    for (let i = 0; i < n; i++) {
        noSplitCost += Math.abs(arr[i] - brr[i]);
    }
    const sortedArr = [...arr].sort((a, b) => a - b);
    const sortedBrr = [...brr].sort((a, b) => a - b);
    let sortedCost = 0;
    for (let i = 0; i < n; i++) {
        sortedCost += Math.abs(sortedArr[i] - sortedBrr[i]);
    }
    const splitCost = k + sortedCost;
    return Math.min(noSplitCost, splitCost);
};