const maximumLength = (nums: number[], k: number): number => {
    // dp[lastMod][currentMod] = length of the longest valid subsequence
    // ending with (last element mod k = lastMod, current element mod k = currentMod)
    const dp: number[][] = Array.from({ length: k }, () =>
        Array(k).fill(0)
    );

    let maxLength = 0;

    for (const num of nums) {
        const currentMod = num % k;

        for (let lastMod = 0; lastMod < k; lastMod++) {
            // By flipping indices, we ensure:
            // (lastMod + currentMod) % k remains consistent implicitly
            dp[lastMod][currentMod] = dp[currentMod][lastMod] + 1;
            maxLength = Math.max(maxLength, dp[lastMod][currentMod]);
        }
    }

    return maxLength;
};