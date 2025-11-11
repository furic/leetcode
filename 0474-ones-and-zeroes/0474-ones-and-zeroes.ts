const findMaxForm = (strs: string[], m: number, n: number): number => {
    // DP table: dp[zeroCount][oneCount] = max strings we can take with these limits
    const dp = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));

    // Process each string as a potential item in the knapsack
    for (let stringIndex = 0; stringIndex < strs.length; stringIndex++) {
        const currentString = strs[stringIndex];
        
        // Count zeros and ones in current string
        let zeroCount = 0;
        let oneCount = 0;
        for (let charIndex = 0; charIndex < currentString.length; charIndex++) {
            if (currentString.charAt(charIndex) === '0') {
                zeroCount++;
            } else {
                oneCount++;
            }
        }

        // Update DP table in reverse order to avoid using same string multiple times
        // This is the 0/1 knapsack pattern
        for (let availableZeros = m; availableZeros >= zeroCount; availableZeros--) {
            for (let availableOnes = n; availableOnes >= oneCount; availableOnes--) {
                // Choice: take current string or skip it
                const skipString = dp[availableZeros][availableOnes];
                const takeString = dp[availableZeros - zeroCount][availableOnes - oneCount] + 1;
                
                dp[availableZeros][availableOnes] = Math.max(skipString, takeString);
            }
        }
    }

    return dp[m][n];
};