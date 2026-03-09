const numberOfStableArrays = (zero: number, one: number, limit: number): number => {
    const MOD = 1_000_000_007;
    const stride = one + 1;

    // dp0[z][o] = stable arrays using z zeros and o ones, ending in a 0-block
    // dp1[z][o] = stable arrays using z zeros and o ones, ending in a 1-block
    const dp0 = new Uint32Array((zero + 1) * stride);
    const dp1 = new Uint32Array((zero + 1) * stride);

    // pref1[z][o] = prefix sum of dp1 over z dimension (for fixed o)
    // pref0[z][o] = prefix sum of dp0 over o dimension (for fixed z)
    const pref1 = new Uint32Array((zero + 1) * stride);
    const pref0 = new Uint32Array((zero + 1) * stride);

    // Dummy seed at (0,0) to bootstrap the first block of zeros or ones
    dp0[0] = 1;
    dp1[0] = 1;

    for (let z = 0; z <= zero; z++) {
        const zOff      = z * stride;
        const prevZOff  = (z - 1) * stride;
        const limitZOff = (z - limit - 1) * stride;

        for (let o = 0; o <= one; o++) {
            const idx = zOff + o;

            if (z === 0 && o === 0) {
                pref1[idx] = 1;
                pref0[idx] = 1;
                continue;
            }

            // dp0[z][o] = sum of dp1[z-k][o] for k in 1..limit (sliding window via prefix sum)
            if (z > 0) {
                let val = pref1[prevZOff + o];
                if (z > limit) val = (val - pref1[limitZOff + o] + MOD) % MOD;
                dp0[idx] = val;
            }

            // dp1[z][o] = sum of dp0[z][o-k] for k in 1..limit (sliding window via prefix sum)
            if (o > 0) {
                let val = pref0[idx - 1];
                if (o > limit) val = (val - pref0[idx - limit - 1] + MOD) % MOD;
                dp1[idx] = val;
            }

            // Accumulate prefix sums for the next iteration
            pref1[idx] = z > 0 ? (dp1[idx] + pref1[prevZOff + o]) % MOD : dp1[idx];
            pref0[idx] = o > 0 ? (dp0[idx] + pref0[idx - 1])     % MOD : dp0[idx];
        }
    }

    return (dp0[zero * stride + one] + dp1[zero * stride + one]) % MOD;
};