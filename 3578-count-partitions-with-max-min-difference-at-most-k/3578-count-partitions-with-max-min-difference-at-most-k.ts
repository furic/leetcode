/**
 * Counts ways to partition array into segments where max - min <= k in each segment
 * Uses DP with sliding window and monotonic queues to track valid segment ranges
 */
const countPartitions = (nums: number[], k: number): number => {
    const numElements = nums.length;
    const MOD = 1e9 + 7;
    
    // dp[i] = number of ways to partition nums[0...i-1]
    const partitionWays = new Array<number>(numElements + 1).fill(0);
    
    // prefixSum[i] = sum of partitionWays[0...i] for efficient range sum queries
    const prefixSum = new Array<number>(numElements + 1).fill(0);
    
    // Monotonic queues storing indices (not values)
    // maxIndexQueue: indices in decreasing order of their values
    // minIndexQueue: indices in increasing order of their values
    const maxIndexQueue: number[] = [];
    const minIndexQueue: number[] = [];

    // Base case: empty array has 1 way to partition (no segments)
    partitionWays[0] = 1;
    prefixSum[0] = 1;

    // leftBound tracks the leftmost valid starting position for current segment
    let leftBound = 0;

    for (let currentIndex = 0; currentIndex < numElements; currentIndex++) {
        // Maintain max queue: remove elements smaller than current from back
        while (maxIndexQueue.length > 0 && nums[maxIndexQueue.at(-1)!] <= nums[currentIndex]) {
            maxIndexQueue.pop();
        }
        maxIndexQueue.push(currentIndex);

        // Maintain min queue: remove elements larger than current from back
        while (minIndexQueue.length > 0 && nums[minIndexQueue.at(-1)!] >= nums[currentIndex]) {
            minIndexQueue.pop();
        }
        minIndexQueue.push(currentIndex);

        // Shrink window from left while max - min > k
        while (
            maxIndexQueue.length > 0 &&
            minIndexQueue.length > 0 &&
            nums[maxIndexQueue[0]] - nums[minIndexQueue[0]] > k
        ) {
            // Remove indices that have moved out of the window
            if (maxIndexQueue[0] === leftBound) {
                maxIndexQueue.shift();
            }
            if (minIndexQueue[0] === leftBound) {
                minIndexQueue.shift();
            }
            leftBound++;
        }

        // Sum ways from all valid starting positions [leftBound, currentIndex]
        // partitionWays[currentIndex + 1] = sum of partitionWays[leftBound...currentIndex]
        const rangeSum = prefixSum[currentIndex] - (leftBound > 0 ? prefixSum[leftBound - 1] : 0);
        partitionWays[currentIndex + 1] = (rangeSum + MOD) % MOD;
        
        // Update prefix sum for next iteration
        prefixSum[currentIndex + 1] = (prefixSum[currentIndex] + partitionWays[currentIndex + 1]) % MOD;
    }

    return partitionWays[numElements];
};