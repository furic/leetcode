# Greedy Concat Comparator + Run-Length Sort | 45 Lines | O(n log n × L) | 599ms

# Intuition
To maximize the concatenated binary value, we want segments with more leading `1`s placed earlier. The classic greedy insight for concatenation ordering applies: segment A should come before B if `concat(A, B) > concat(B, A)` lexicographically. Comparing concatenations directly via run-length encoding avoids materializing the full strings.

# Approach
- **Segment representation:** Each segment is `nums1[i]` ones followed by `nums0[i]` zeros.
- **Greedy comparator:** Sort segments so that `A` precedes `B` if `AB > BA` lexicographically. This is the same principle as the "largest number" problem, extended to binary strings.
- **Run-length comparison (`compareRuns`):** Instead of building full strings, encode each concatenation as a run-length array (e.g. `"11100"` → `[(1,3),(0,2)]`). Walk both RLE arrays in parallel with a shared position pointer, comparing at the first differing bit. This avoids O(L²) string allocations during sort.
- **`buildRuns`:** Merges the four segments (ones_A, zeros_A, ones_B, zeros_B) into a compact RLE, merging adjacent runs of the same bit (e.g. when A ends in `1`s and B starts with `1`s).
- **Value computation:** After sorting, accumulate the binary value modulo `10^9 + 7`. For each segment of length `segLen` with `ones` ones followed by `zeros` zeros:
  - Its raw value = `2^segLen - 2^zeros` (a block of `ones` ones shifted left by `zeros` positions).
  - Append to running result: `result = result × 2^segLen + segVal`.
- Precompute powers of 2 up to total bit length for O(1) lookup.

# Complexity
- Time complexity: $$O(n \log n \times L)$$ where $$L$$ is the average segment length — the sort makes $$O(n \log n)$$ comparisons, each O(L) via RLE walking.

- Space complexity: $$O(n + T)$$ where $$T$$ is the total number of bits — for the powers-of-2 table and sort index array.

# Code
```typescript []
const maxValue = (nums1: number[], nums0: number[]): number => {
    const MOD = 1_000_000_007;
    const n = nums1.length;
    const BIGMOD = BigInt(MOD);

    const mulmod = (a: number, b: number): number =>
        Number(BigInt(a) * BigInt(b) % BIGMOD);

    const totalLen = nums1.reduce((s, v, i) => s + v + nums0[i], 0);
    const pow2 = new Array<number>(totalLen + 1);
    pow2[0] = 1;
    for (let i = 1; i <= totalLen; i++) pow2[i] = pow2[i - 1] * 2 % MOD;

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

    const order = Array.from({length: n}, (_, i) => i);
    order.sort((a, b) => {
        const runsAB = buildRuns(nums1[a], nums0[a], nums1[b], nums0[b]);
        const runsBA = buildRuns(nums1[b], nums0[b], nums1[a], nums0[a]);
        return compareRuns(runsAB, runsBA);
    });

    let result = 0;
    for (const i of order) {
        const segLen = nums1[i] + nums0[i];
        const segVal = (pow2[segLen] - pow2[nums0[i]] + MOD) % MOD;
        result = (mulmod(result, pow2[segLen]) + segVal) % MOD;
    }

    return result;
};
```