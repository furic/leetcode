function maximizeSquareArea(totalHeight: number, totalWidth: number, horizontalCuts: number[], verticalCuts: number[]): number {
    const MOD = 1000000007n;

    const prep = (cuts: number[], limit: number) => [1, ...cuts.sort((a, b) => a - b), limit];

    const h = prep(horizontalCuts, totalHeight);
    const v = prep(verticalCuts, totalWidth);

    const gapSet = new Set<number>();

    for (let i = 0; i < h.length; i++)
        for (let j = i + 1; j < h.length; j++)
            gapSet.add(h[j] - h[i]);

    let best = 0;

    for (let i = 0; i < v.length; i++)
        for (let j = i + 1; j < v.length; j++) {
            const d = v[j] - v[i];
            if (d > best && gapSet.has(d)) best = d;
        }

    if (best === 0) return -1;
    const ans = (BigInt(best) * BigInt(best)) % MOD;

    return Number(ans);
}