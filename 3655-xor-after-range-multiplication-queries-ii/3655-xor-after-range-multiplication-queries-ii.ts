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
    const BLOCK = (Math.sqrt(n) | 0) + 1; // Sqrt decomposition threshold

    const values = new BigInt64Array(n);
    for (let i = 0; i < n; i++) values[i] = BigInt(nums[i]);

    // For small steps (k < BLOCK): lazily accumulate multipliers per step size,
    // then apply in a single sweep. Each events[k] is a Float64Array of length n+1
    // initialised to 1.0 (neutral multiplier).
    const stepEvents: (Float64Array | null)[] = new Array(BLOCK).fill(null);

    const getStepEvents = (k: number): Float64Array => {
        if (!stepEvents[k]) stepEvents[k] = new Float64Array(n + 1).fill(1.0);
        return stepEvents[k]!;
    };

    for (const [left, right, step, multiplier] of queries) {
        const vBig = BigInt(multiplier);

        if (step >= BLOCK) {
            // Large step: few affected indices — apply directly
            for (let i = left; i <= right; i += step)
                values[i] = values[i] * vBig % MOD;
            continue;
        }

        // Small step: mark range [left, nextBeyondRight) in the difference array
        const e = getStepEvents(step);
        e[left] = Number(BigInt(e[left]) * vBig % MOD);

        const rem = (right - left) % step;
        const endExclusive = rem === 0 ? right + step : right + (step - rem);
        if (endExclusive <= n) {
            const invV = modPow(vBig, MOD - 2n, MOD);
            e[endExclusive] = Number(BigInt(e[endExclusive]) * invV % MOD);
        }
    }

    // Sweep each step size: propagate prefix product and apply to values
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