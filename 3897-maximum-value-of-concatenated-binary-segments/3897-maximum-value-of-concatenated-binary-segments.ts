const maxValue = (nums1: number[], nums0: number[]): number => {
    const MOD = 1_000_000_007;
    const n = nums1.length;
    const BIGMOD = BigInt(MOD);

    const mulmod = (a: number, b: number): number =>
        Number(BigInt(a) * BigInt(b) % BIGMOD);

    // Precompute powers of 2
    const totalLen = nums1.reduce((s, v, i) => s + v + nums0[i], 0);
    const pow2 = new Array<number>(totalLen + 1);
    pow2[0] = 1;
    for (let i = 1; i <= totalLen; i++) pow2[i] = pow2[i - 1] * 2 % MOD;

    // Run-length encode the concatenation of segment A then segment B
    const buildRuns = (oa: number, za: number, ob: number, zb: number): [number, number][] => {
        const raw: [number, number][] = [];
        if (oa > 0) raw.push([1, oa]);
        if (za > 0) raw.push([0, za]);
        if (ob > 0) raw.push([1, ob]);
        if (zb > 0) raw.push([0, zb]);
        const merged: [number, number][] = [];
        for (const [ch, cnt] of raw) {
            if (merged.length > 0 && merged[merged.length - 1][0] === ch) {
                merged[merged.length - 1][1] += cnt;
            } else {
                merged.push([ch, cnt]);
            }
        }
        return merged;
    };

    // Lexicographic comparison of two run-length encoded binary strings (same total length)
    // Returns negative if r1 > r2 (descending order for sort)
    const compareRuns = (r1: [number, number][], r2: [number, number][]): number => {
        let i1 = 0, i2 = 0, used1 = 0, used2 = 0;
        while (i1 < r1.length && i2 < r2.length) {
            if (r1[i1][0] !== r2[i2][0]) return r2[i2][0] - r1[i1][0];
            const skip = Math.min(r1[i1][1] - used1, r2[i2][1] - used2);
            used1 += skip;
            used2 += skip;
            if (used1 === r1[i1][1]) { i1++; used1 = 0; }
            if (used2 === r2[i2][1]) { i2++; used2 = 0; }
        }
        return 0;
    };

    // Sort by greedy comparator: a before b iff concat(a,b) > concat(b,a) lexicographically
    const order = Array.from({length: n}, (_, i) => i);
    order.sort((a, b) => {
        const runsAB = buildRuns(nums1[a], nums0[a], nums1[b], nums0[b]);
        const runsBA = buildRuns(nums1[b], nums0[b], nums1[a], nums0[a]);
        return compareRuns(runsAB, runsBA);
    });

    // Build the final value: append each segment's bits
    let result = 0;
    for (const i of order) {
        const segLen = nums1[i] + nums0[i];
        const segVal = (pow2[segLen] - pow2[nums0[i]] + MOD) % MOD;
        result = (mulmod(result, pow2[segLen]) + segVal) % MOD;
    }

    return result;
};