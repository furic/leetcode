/**
 * Finds the smallest subarray to remove so remaining sum is divisible by p
 * Uses prefix sums with hash map: find shortest subarray with sum ≡ (totalSum % p) mod p
 */
const minSubarray = (nums: number[], p: number): number => {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    const remainderToRemove = totalSum % p;

    // If total is already divisible by p, no removal needed
    if (remainderToRemove === 0) return 0;

    // Map: prefix sum remainder → most recent index with that remainder
    const prefixRemainderToIndex = new Map<number, number>();
    prefixRemainderToIndex.set(0, -1); // Empty prefix (before index 0) has sum 0

    let currentPrefixRemainder = 0;
    let minSubarrayLength = nums.length;

    for (let i = 0; i < nums.length; i++) {
        currentPrefixRemainder = (currentPrefixRemainder + nums[i]) % p;

        // We need: (prefix[i] - prefix[j]) % p === remainderToRemove
        // So: prefix[j] % p === (prefix[i] - remainderToRemove + p) % p
        const targetPrefixRemainder = (currentPrefixRemainder - remainderToRemove + p) % p;

        if (prefixRemainderToIndex.has(targetPrefixRemainder)) {
            const subarrayLength = i - prefixRemainderToIndex.get(targetPrefixRemainder)!;
            minSubarrayLength = Math.min(minSubarrayLength, subarrayLength);
        }

        prefixRemainderToIndex.set(currentPrefixRemainder, i);
    }

    // Return -1 if we'd have to remove the entire array
    return minSubarrayLength === nums.length ? -1 : minSubarrayLength;
};