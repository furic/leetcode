function stoneGameVIII(stones: number[]): number {
    const n: number = stones.length;

    for (let i = 1; i < n; i++) {
        stones[i] += stones[i - 1];
    }

    let best: number = stones[n - 1];

    for (let i = n - 2; i >= 1; i--) {
        best = Math.max(
            best,
            stones[i] - best
        );
    }

    return best;
};