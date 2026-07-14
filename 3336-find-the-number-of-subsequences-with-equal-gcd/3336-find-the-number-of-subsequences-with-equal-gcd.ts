const subsequencePairCount = (nums: number[]): number => {
    const MOD = 1_000_000_007;
    const maxVal = Math.max(...nums);

    const gcd = (a: number, b: number): number => {
        while (b !== 0) { const t = a % b; a = b; b = t; }
        return a;
    };

    // dp[g1][g2] = ways to pick two disjoint subsequences with GCDs g1 and g2
    let dp: number[][] = Array.from({ length: maxVal + 1 }, () => new Array(maxVal + 1).fill(0));
    dp[0][0] = 1;

    for (const num of nums) {
        const next: number[][] = Array.from({ length: maxVal + 1 }, () => new Array(maxVal + 1).fill(0));

        for (let g1 = 0; g1 <= maxVal; g1++) {
            const ng1 = gcd(g1, num);
            for (let g2 = 0; g2 <= maxVal; g2++) {
                const ways = dp[g1][g2];
                if (ways === 0) continue;

                const ng2 = gcd(g2, num);
                next[g1][g2] = (next[g1][g2] + ways) % MOD; // skip
                next[ng1][g2] = (next[ng1][g2] + ways) % MOD; // add to seq1
                next[g1][ng2] = (next[g1][ng2] + ways) % MOD; // add to seq2
            }
        }

        dp = next;
    }

    let total = 0;
    for (let g = 1; g <= maxVal; g++) total = (total + dp[g][g]) % MOD;
    return total;
};