/**
 * Finds minimum cost to divide array into k subarrays with distance constraint
 * Cost = sum of first elements of each subarray
 * Constraint: (k-1)th split - 1st split ≤ dist
 * Strategy: Sliding window + Fenwick Tree to find k-1 smallest values in valid range
 */
const minimumCost = (nums: number[], k: number, dist: number): number => {
    const arrayLength = nums.length;
    const numAdditionalSplits = k - 1; // First split is always at index 0
    
    // Coordinate compression: map values to ranks for Fenwick Tree
    const sortedUniqueValues = Array.from(new Set(nums)).sort((a, b) => a - b);
    const numUniqueValues = sortedUniqueValues.length;
    
    // Fenwick Trees (Binary Indexed Trees) for efficient range queries
    // fenwickTreeSum[i] = sum of values in range
    // fenwickTreeCount[i] = count of elements in range
    const fenwickTreeSum = new Float64Array(numUniqueValues + 1);
    const fenwickTreeCount = new Int32Array(numUniqueValues + 1);
    
    // Map each unique value to its rank (1-indexed for Fenwick Tree)
    const valueToRank = new Map<number, number>();
    sortedUniqueValues.forEach((value, index) => {
        valueToRank.set(value, index + 1);
    });

    /**
     * Updates Fenwick Tree at given rank
     * @param treeIndex - rank in Fenwick Tree (1-indexed)
     * @param valueDelta - change in sum
     * @param countDelta - change in count (+1 for add, -1 for remove)
     */
    const updateFenwickTree = (treeIndex: number, valueDelta: number, countDelta: number): void => {
        // Standard Fenwick Tree update: propagate up the tree
        for (; treeIndex <= numUniqueValues; treeIndex += treeIndex & -treeIndex) {
            fenwickTreeSum[treeIndex] += valueDelta;
            fenwickTreeCount[treeIndex] += countDelta;
        }
    };

    // Find largest power of 2 ≤ numUniqueValues for binary search in Fenwick Tree
    let maxPowerOfTwo = 1;
    while ((maxPowerOfTwo << 1) <= numUniqueValues) {
        maxPowerOfTwo <<= 1;
    }
    
    let minAdditionalCost = Infinity;

    // Sliding window: for each position as potential k-1th split
    for (let windowEnd = 1; windowEnd < arrayLength; windowEnd++) {
        // Add current element to window
        const currentRank = valueToRank.get(nums[windowEnd])!;
        updateFenwickTree(currentRank, nums[windowEnd], 1);
        
        // Remove element that's too far back (outside dist constraint)
        if (windowEnd > dist + 1) {
            const removedValue = nums[windowEnd - dist - 1];
            const removedRank = valueToRank.get(removedValue)!;
            updateFenwickTree(removedRank, -removedValue, -1);
        }
        
        // Once we have enough elements, find sum of k-1 smallest in window
        if (windowEnd >= numAdditionalSplits) {
            // Binary search in Fenwick Tree to find k-1 smallest elements
            let searchIndex = 0;
            let cumulativeCount = 0;
            let cumulativeSum = 0;
            
            // Binary search using powers of 2
            for (let powerOfTwo = maxPowerOfTwo; powerOfTwo > 0; powerOfTwo >>= 1) {
                const nextIndex = searchIndex + powerOfTwo;
                
                // Check if we can include this segment without exceeding k-1 elements
                if (nextIndex <= numUniqueValues && 
                    cumulativeCount + fenwickTreeCount[nextIndex] < numAdditionalSplits) {
                    searchIndex = nextIndex;
                    cumulativeCount += fenwickTreeCount[searchIndex];
                    cumulativeSum += fenwickTreeSum[searchIndex];
                }
            }
            
            // If we haven't reached k-1 elements yet, add remaining from next rank
            if (cumulativeCount < numAdditionalSplits) {
                const remainingNeeded = numAdditionalSplits - cumulativeCount;
                cumulativeSum += remainingNeeded * sortedUniqueValues[searchIndex];
            }
            
            minAdditionalCost = Math.min(minAdditionalCost, cumulativeSum);
        }
    }
    
    // Total cost = first subarray cost + k-1 additional subarray costs
    return nums[0] + minAdditionalCost;
};