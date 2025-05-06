const magicalSum = (m: number, k: number, nums: number[]): number => {
    const MOD = BigInt(1e9 + 7);
    const n = nums.length;

    // Precompute factorial and inverse factorial with BigInt
    const factorial: bigint[] = Array(m + 1).fill(BigInt(1));
    for (let i = 1; i <= m; i++) {
        factorial[i] = factorial[i - 1] * BigInt(i) % MOD;
    }

    const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let result = BigInt(1);
        base %= mod;
        while (exp > 0) {
            if (exp % BigInt(2) === BigInt(1)) result = (result * base) % mod;
            base = (base * base) % mod;
            exp /= BigInt(2);
        }
        return result;
    };

    const inverseFactorial: bigint[] = Array(m + 1).fill(BigInt(1));
    inverseFactorial[m] = modPow(factorial[m], MOD - BigInt(2), MOD);
    for (let i = m; i >= 1; i--) {
        inverseFactorial[i - 1] = inverseFactorial[i] * BigInt(i) % MOD;
    }

    // Precompute powers of nums
    const powNums: bigint[][] = Array.from({ length: n }, () =>
        Array(m + 1).fill(BigInt(1))
    );
    for (let i = 0; i < n; i++) {
        for (let c = 1; c <= m; c++) {
            powNums[i][c] = powNums[i][c - 1] * BigInt(nums[i]) % MOD;
        }
    }

    // DP array: dp[i][m1][k1][carry] = count of ways
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: m + 1 }, () =>
            Array.from({ length: k + 1 }, () =>
                Array<bigint>(m + 1).fill(BigInt(0))
            )
        )
    );
    dp[0][0][0][0] = BigInt(1);

    for (let i = 0; i < n; i++) {
        for (let m1 = 0; m1 <= m; m1++) {
            for (let k1 = 0; k1 <= k; k1++) {
                for (let carry = 0; carry <= m; carry++) {
                    const val = dp[i][m1][k1][carry];
                    if (val === BigInt(0)) continue;
                    for (let c = 0; c <= m - m1; c++) {
                        const m2 = m1 + c;
                        const sumBits = c + carry;
                        const nextCarry = sumBits >> 1;
                        const addedSetBits = sumBits & 1;
                        const k2 = k1 + addedSetBits;
                        if (k2 > k) continue;

                        const contrib = val * inverseFactorial[c] % MOD * powNums[i][c] % MOD;
                        dp[i + 1][m2][k2][nextCarry] =
                            (dp[i + 1][m2][k2][nextCarry] + contrib) % MOD;
                    }
                }
            }
        }
    }

    // Sum valid final states
    let result = BigInt(0);
    for (let k1 = 0; k1 <= k; k1++) {
        for (let carry = 0; carry <= m; carry++) {
            const val = dp[n][m][k1][carry];
            if (val === BigInt(0)) continue;
            const bits = carry.toString(2).split("1").length - 1;
            if (k1 + bits === k) {
                result = (result + val) % MOD;
            }
        }
    }

    result = result * factorial[m] % MOD;
    return Number(result);
};