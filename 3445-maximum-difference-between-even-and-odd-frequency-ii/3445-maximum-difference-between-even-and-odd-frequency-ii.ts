const maxDifference = (s: string, k: number): number => {
    const n = s.length;
    let maxDiff = -Infinity;

    // Try all pairs of different digits a != b
    for (let a = 0; a <= 4; a++) {
        for (let b = 0; b <= 4; b++) {
            if (a === b) continue;

            // Prefix sums for count of digit a and digit b
            const countA: number[] = Array(n + 1).fill(0);
            const countB: number[] = Array(n + 1).fill(0);

            for (let i = 1; i <= n; i++) {
                const digit = Number(s[i - 1]);
                countA[i] = countA[i - 1] + (digit === a ? 1 : 0);
                countB[i] = countB[i - 1] + (digit === b ? 1 : 0);
            }

            // g[parityA][parityB] stores max (countB[j] - countA[j]) for each parity combo
            const g: number[][] = [
                [-Infinity, -Infinity],
                [-Infinity, -Infinity]
            ];

            let j = 0;

            for (let i = k; i <= n; i++) {
                // Maintain a sliding window of at least length k
                while (i - j >= k && countA[i] > countA[j] && countB[i] > countB[j]) {
                    const parityA = countA[j] % 2;
                    const parityB = countB[j] % 2;
                    g[parityA][parityB] = Math.max(g[parityA][parityB], countB[j] - countA[j]);
                    j++;
                }

                const parityA = countA[i] % 2;
                const parityB = countB[i] % 2;
                const bestPrev = g[1 - parityA][parityB];

                if (bestPrev !== -Infinity) {
                    const diff = (countA[i] - countB[i]) + bestPrev;
                    maxDiff = Math.max(maxDiff, diff);
                }
            }
        }
    }

    return maxDiff === -Infinity ? -1 : maxDiff;
};