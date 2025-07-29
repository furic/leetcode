const possibleStringCount = (word: string, k: number): number => {
    const MOD = 1e9 + 7;
    const n = word.length;

    // Collect consecutive character counts as "blocks"
    const consecutiveCounts: number[] = [];
    let currentCount = 1;

    for (let i = 1; i < n; i++) {
        if (word[i] === word[i - 1]) {
            currentCount++;
        } else {
            consecutiveCounts.push(currentCount);
            currentCount = 1;
        }
    }
    consecutiveCounts.push(currentCount);

    // Calculate total combinations if no deletion (product of each block length)
    let totalCombinations = 1;
    for (const count of consecutiveCounts) {
        totalCombinations = (totalCombinations * count) % MOD;
    }

    // If already >= k characters, all substrings are valid
    if (consecutiveCounts.length >= k) {
        return totalCombinations;
    }

    // DP to calculate the count of subsets with length < k to exclude
    const f = new Array(k).fill(0);
    const prefixSum = new Array(k).fill(1); // prefixSum[j] = sum_{i=0}^{j} f[i]
    f[0] = 1;

    for (const blockLength of consecutiveCounts) {
        const nextF = new Array(k).fill(0);

        for (let used = 1; used < k; used++) {
            nextF[used] = prefixSum[used - 1];
            if (used - blockLength - 1 >= 0) {
                nextF[used] = (nextF[used] - prefixSum[used - blockLength - 1] + MOD) % MOD;
            }
        }

        const nextPrefixSum = new Array(k).fill(0);
        nextPrefixSum[0] = nextF[0];
        for (let j = 1; j < k; j++) {
            nextPrefixSum[j] = (nextPrefixSum[j - 1] + nextF[j]) % MOD;
        }

        for (let j = 0; j < k; j++) {
            f[j] = nextF[j];
            prefixSum[j] = nextPrefixSum[j];
        }
    }

    // Subtract the count of subsets with length < k from totalCombinations
    return (totalCombinations - prefixSum[k - 1] + MOD) % MOD;
};