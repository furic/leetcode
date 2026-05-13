const minMoves = (nums: number[], limit: number): number => {
    const n = nums.length;
    // Difference array over all possible target sums [2, 2*limit]
    const delta = new Int32Array((limit << 1) + 2);

    for (let i = 0; i < n >> 1; i++) {
        const lo = Math.min(nums[i], nums[n - 1 - i]);
        const hi = Math.max(nums[i], nums[n - 1 - i]);

        // Base cost: 2 moves for every target sum
        delta[2] += 2;
        // [lo+1, lo+hi): 1 move suffices (change the smaller element)
        delta[lo + 1]--;
        // [lo+hi, lo+hi]: 0 moves (sum already matches)
        delta[lo + hi]--;
        delta[lo + hi + 1]++;
        // (lo+hi, hi+limit]: 1 move suffices (change the larger element)
        delta[hi + limit + 1]++;
    }

    let minCost = n;
    let cost = 0;

    for (let target = 2; target <= limit * 2; target++) {
        cost += delta[target];
        minCost = Math.min(minCost, cost);
    }

    return minCost;
};