const stoneGameVIII = (stones: number[]): number => {
    const n = stones.length;

    // Convert to prefix sums in-place
    for (let i = 1; i < n; i++) stones[i] += stones[i - 1];

    let best = stones[n - 1];
    for (let i = n - 2; i >= 1; i--)
        best = Math.max(best, stones[i] - best);

    return best;
};