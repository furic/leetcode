function minimumCost(nums: number[], k: number, dist: number): number {
    const n = nums.length, targetK = k - 1;
    const sorted = Array.from(new Set(nums)).sort((a, b) => a - b);
    const m = sorted.length;
    const bitSum = new Float64Array(m + 1);
    const bitCount = new Int32Array(m + 1);
    const rankMap = new Map<number, number>();
    sorted.forEach((v, i) => rankMap.set(v, i + 1));

    const update = (r: number, v: number, c: number) => {
        for (; r <= m; r += r & -r) {
            bitSum[r] += v; bitCount[r] += c;
        }
    };

    let maxP = 1;
    while ((maxP << 1) <= m) maxP <<= 1;
    let minExtra = Infinity;

    for (let i = 1; i < n; i++) {
        update(rankMap.get(nums[i])!, nums[i], 1);
        if (i > dist + 1) {
            const oldV = nums[i - dist - 1];
            update(rankMap.get(oldV)!, -oldV, -1);
        }
        if (i >= targetK) {
            let idx = 0, cc = 0, cs = 0;
            for (let p = maxP; p > 0; p >>= 1) {
                if (idx + p <= m && cc + bitCount[idx + p] < targetK) {
                    idx += p; cc += bitCount[idx]; cs += bitSum[idx];
                }
            }
            if (cc < targetK) cs += (targetK - cc) * sorted[idx];
            minExtra = Math.min(minExtra, cs);
        }
    }
    return nums[0] + minExtra;
}