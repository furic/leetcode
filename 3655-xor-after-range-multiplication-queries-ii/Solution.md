# Sqrt Decomposition Lazy Multiplier | 55 Lines | O((n + q) × √n) | 553ms

# Intuition
Direct simulation is O(q × n/k) — fine for small constraints but too slow when `n, q ≤ 10^5`. The key insight: small-step queries (k < √n) hit many indices and should be batched; large-step queries (k ≥ √n) hit at most √n indices and can be applied directly.

# Approach
- **Sqrt decomposition threshold:** `BLOCK = ceil(√n)`. Queries are split into two cases based on their step size.
- **Large steps (k ≥ BLOCK):** At most `n/k ≤ √n` indices are affected per query — apply directly to `values[]` via modular multiply.
- **Small steps (k < BLOCK):** Use a per-step-size "difference array" of multipliers (`stepEvents[k]`, a `Float64Array` of length `n+1` initialised to `1.0`). For a query `[left, right, k, v]`:
  - Multiply `stepEvents[k][left]` by `v` — marks where the multiplier range starts.
  - Multiply `stepEvents[k][endExclusive]` by `v⁻¹ (mod MOD)` — marks where it ends. `endExclusive` is the next position beyond `right` that is aligned to the same residue class mod `k`.
  - This encodes a "range multiply" on positions `left, left+k, left+2k, ...` up to `right`.
- **Sweep phase:** For each small step size `k`, walk through each residue class (`start = 0, 1, ..., k-1`) in strides of `k`. Maintain a running product, update it at each `stepEvents[k][i] ≠ 1` marker, and apply to `values[i]`.
- **XOR:** After all queries are applied, XOR all elements of `values[]` and return.
- All arithmetic on `values` uses `BigInt64Array` and explicit `% MOD` to avoid precision loss.

# Complexity
- Time complexity: $$O((n + q) \times \sqrt{n})$$ — large-step queries cost $$O(\sqrt{n})$$ each; small-step batch sweep costs $$O(n)$$ per step size, and there are $$O(\sqrt{n})$$ step sizes.

- Space complexity: $$O(n \sqrt{n})$$ — in the worst case, all $$\sqrt{n}$$ small step sizes have an active event array of size $$n+1$$.

# Code
```typescript []
const modPow = (base: bigint, exp: bigint, MOD: bigint): bigint => {
    let result = 1n;
    base %= MOD;
    while (exp > 0n) {
        if (exp & 1n) result = result * base % MOD;
        base = base * base % MOD;
        exp >>= 1n;
    }
    return result;
};

const xorAfterQueries = (nums: number[], queries: number[][]): number => {
    const n = nums.length;
    const MOD = 1_000_000_007n;
    const BLOCK = (Math.sqrt(n) | 0) + 1;

    const values = new BigInt64Array(n);
    for (let i = 0; i < n; i++) values[i] = BigInt(nums[i]);

    const stepEvents: (Float64Array | null)[] = new Array(BLOCK).fill(null);
    const getStepEvents = (k: number): Float64Array => {
        if (!stepEvents[k]) stepEvents[k] = new Float64Array(n + 1).fill(1.0);
        return stepEvents[k]!;
    };

    for (const [left, right, step, multiplier] of queries) {
        const vBig = BigInt(multiplier);

        if (step >= BLOCK) {
            for (let i = left; i <= right; i += step)
                values[i] = values[i] * vBig % MOD;
            continue;
        }

        const e = getStepEvents(step);
        e[left] = Number(BigInt(e[left]) * vBig % MOD);

        const rem = (right - left) % step;
        const endExclusive = rem === 0 ? right + step : right + (step - rem);
        if (endExclusive <= n) {
            const invV = modPow(vBig, MOD - 2n, MOD);
            e[endExclusive] = Number(BigInt(e[endExclusive]) * invV % MOD);
        }
    }

    for (let step = 1; step < BLOCK; step++) {
        const e = stepEvents[step];
        if (!e) continue;

        for (let start = 0; start < step && start < n; start++) {
            let runningMult = 1n;
            for (let i = start; i < n; i += step) {
                if (e[i] !== 1.0) runningMult = runningMult * BigInt(e[i]) % MOD;
                if (runningMult !== 1n) values[i] = values[i] * runningMult % MOD;
            }
        }
    }

    let result = 0;
    for (let i = 0; i < n; i++) result ^= Number(values[i]);
    return result;
};
```