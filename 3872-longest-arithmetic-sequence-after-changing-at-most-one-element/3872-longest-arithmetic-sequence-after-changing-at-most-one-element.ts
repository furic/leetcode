const longestArithmetic = (nums: number[]): number => {
    const n = nums.length;
    if (n <= 2) return n;

    const gaps = Array.from({ length: n - 1 }, (_, i) => nums[i + 1] - nums[i]);
    const m = gaps.length;

    const runFrom = new Array<number>(m).fill(1);
    for (let i = 1; i < m; i++) {
        if (gaps[i] === gaps[i - 1]) runFrom[i] = runFrom[i - 1] + 1;
    }

    const runTo = new Array<number>(m).fill(1);
    for (let i = m - 2; i >= 0; i--) {
        if (gaps[i] === gaps[i + 1]) runTo[i] = runTo[i + 1] + 1;
    }

    let maxLength = 2;

    // Case A: no replacement
    for (let i = 0; i < m; i++) {
        maxLength = Math.max(maxLength, runFrom[i] + 1);
    }

    // Case B: replace element just right of a left run (extend right by 1)
    for (let j = 0; j < m - 1; j++) {
        maxLength = Math.max(maxLength, runFrom[j] + 2);
    }

    // Case C: replace element just left of a right run (extend left by 1)
    for (let j = 1; j < m; j++) {
        maxLength = Math.max(maxLength, runTo[j] + 2);
    }

    // Case D: replace interior nums[j], bridging left and right runs.
    // Try each adjacent run's diff independently as a candidate d.
    for (let j = 1; j <= n - 2; j++) {
        const gapLeft  = gaps[j - 1];
        const gapRight = gaps[j];

        const dCandidates = new Set<number>();
        if (j >= 2)     dCandidates.add(gaps[j - 2]);
        if (j <= n - 3) dCandidates.add(gaps[j + 1]);
        if (dCandidates.size === 0 && (gapLeft + gapRight) % 2 === 0) {
            dCandidates.add((gapLeft + gapRight) / 2);
        }

        for (const d of dCandidates) {
            if (gapLeft + gapRight !== 2 * d) continue;

            const leftLen  = (j >= 2     && gaps[j - 2] === d) ? runFrom[j - 2] : 0;
            const rightLen = (j <= n - 3 && gaps[j + 1] === d) ? runTo[j + 1]   : 0;

            maxLength = Math.max(maxLength, leftLen + rightLen + 3);
        }
    }

    return maxLength;
};