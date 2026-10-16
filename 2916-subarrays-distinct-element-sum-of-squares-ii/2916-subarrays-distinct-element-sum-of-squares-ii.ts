const sumCounts = (nums: number[]): number => {
    const MOD = 1_000_000_007;
    const n = nums.length;

    // Segment tree over start positions i. At step r, position i holds distinct(nums[i..r]).
    // rangeSum / rangeSumSq = sum and sum of squares of those values; pendingAdd = lazy "+add" tag.
    const rangeSum   = new Array(4 * n).fill(0);
    const rangeSumSq = new Array(4 * n).fill(0);
    const pendingAdd = new Array(4 * n).fill(0);

    // Add `add` to every value in a node covering `len` positions.
    // (x + a)² = x² + 2ax + a², so sumSq must be updated before sum.
    const applyAdd = (node: number, len: number, add: number): void => {
        rangeSumSq[node] = (rangeSumSq[node] + 2 * add * rangeSum[node] + add * add % MOD * len) % MOD;
        rangeSum[node]   = (rangeSum[node] + add * len) % MOD;
        pendingAdd[node] = (pendingAdd[node] + add) % MOD;
    };

    const pushDown = (node: number, lo: number, hi: number): void => {
        if (pendingAdd[node] === 0 || lo === hi) return;
        const mid = (lo + hi) >> 1;
        applyAdd(node << 1,       mid - lo + 1, pendingAdd[node]);
        applyAdd(node << 1 | 1,   hi - mid,     pendingAdd[node]);
        pendingAdd[node] = 0;
    };

    const rangeAdd = (node: number, lo: number, hi: number, qLo: number, qHi: number, add: number): void => {
        if (qLo > qHi) return;
        if (qLo === lo && qHi === hi) {
            applyAdd(node, hi - lo + 1, add);
            return;
        }
        pushDown(node, lo, hi);
        const mid = (lo + hi) >> 1;
        rangeAdd(node << 1,     lo,      mid, qLo,                 Math.min(qHi, mid), add);
        rangeAdd(node << 1 | 1, mid + 1, hi,  Math.max(qLo, mid + 1), qHi,             add);
        rangeSum[node]   = (rangeSum[node << 1]   + rangeSum[node << 1 | 1])   % MOD;
        rangeSumSq[node] = (rangeSumSq[node << 1] + rangeSumSq[node << 1 | 1]) % MOD;
    };

    const querySumSq = (node: number, lo: number, hi: number, qLo: number, qHi: number): number => {
        if (qLo > qHi) return 0;
        if (qLo === lo && qHi === hi) return rangeSumSq[node];
        pushDown(node, lo, hi);
        const mid = (lo + hi) >> 1;
        return (querySumSq(node << 1,     lo,      mid, qLo,                 Math.min(qHi, mid)) +
                querySumSq(node << 1 | 1, mid + 1, hi,  Math.max(qLo, mid + 1), qHi)) % MOD;
    };

    const lastIndex = new Array(100_001).fill(-1); // last position where each value appeared
    let total = 0;

    for (let r = 0; r < n; r++) {
        const prev = lastIndex[nums[r]];

        // Starts in (prev, r-1] gain nums[r] as a new distinct value
        rangeAdd(1, 0, n - 1, prev + 1, r - 1, 1);
        // New start at r: distinct count is 1
        rangeAdd(1, 0, n - 1, r, r, 1);

        // Sum of squared distinct counts over all subarrays ending at r
        total = (total + querySumSq(1, 0, n - 1, 0, r)) % MOD;
        lastIndex[nums[r]] = r;
    }

    return total;
};