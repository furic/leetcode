/**
 * Finds maximum sum of a subarray whose length is divisible by k
 * Uses prefix sums with modular indexing: for length divisible by k,
 * we need prefixSum[j] - prefixSum[i] where j % k === i % k
 */
const maxSubarraySum = (nums: number[], k: number): number => {
    let currentPrefixSum = 0;
    let maxSum = -Infinity;

    // Track minimum prefix sum for each remainder class (0 to k-1)
    // minPrefixByRemainder[r] = smallest prefix sum at index where index % k === r
    const minPrefixByRemainder: number[] = Array(k).fill(Infinity);

    // Initialize: "prefix sum before index 0" is 0, conceptually at index -1
    // For subarray [0..i] to have length divisible by k, we need (i+1) % k === 0
    // This happens when i % k === k-1, so we set minPrefixByRemainder[k-1] = 0
    minPrefixByRemainder[k - 1] = 0;

    for (let i = 0; i < nums.length; i++) {
        currentPrefixSum += nums[i];
        const currentRemainder = i % k;

        // Max subarray ending at i with length divisible by k:
        // We need a previous prefix at an index with the same remainder
        // Maximize: currentPrefixSum - previousPrefixSum
        maxSum = Math.max(maxSum, currentPrefixSum - minPrefixByRemainder[currentRemainder]);

        // Update minimum prefix sum for this remainder class
        minPrefixByRemainder[currentRemainder] = Math.min(
            minPrefixByRemainder[currentRemainder],
            currentPrefixSum
        );
    }

    return maxSum;
};