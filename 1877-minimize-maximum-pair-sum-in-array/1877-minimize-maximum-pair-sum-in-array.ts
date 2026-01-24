/**
 * Finds the minimized maximum pair sum by optimal pairing
 * Strategy: Sort array, pair smallest with largest to balance pair sums
 * This greedy approach minimizes the maximum by avoiding pairing two large numbers together
 */
const minPairSum = (nums: number[]): number => {
    // Sort in ascending order
    nums.sort((a, b) => a - b);
    
    const arrayLength = nums.length;
    let minMaxPairSum = 0;
    
    // Pair smallest with largest, second smallest with second largest, etc.
    // This balances the pair sums and minimizes the maximum
    for (let pairIndex = 0; pairIndex < arrayLength / 2; pairIndex++) {
        const smallValue = nums[pairIndex];
        const largeValue = nums[arrayLength - pairIndex - 1];
        const pairSum = smallValue + largeValue;
        
        minMaxPairSum = Math.max(minMaxPairSum, pairSum);
    }
    
    return minMaxPairSum;
};