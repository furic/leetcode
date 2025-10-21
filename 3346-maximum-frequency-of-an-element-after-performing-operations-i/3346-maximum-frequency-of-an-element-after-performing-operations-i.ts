const maxFrequency = (nums: number[], k: number, numOperations: number): number => {
    const maxValue = Math.max(...nums);
    const rangeSize = maxValue + k + 1;
    
    // Count frequency of each value in nums
    const frequency: number[] = new Array(rangeSize).fill(0);
    for (const num of nums) {
        frequency[num]++;
    }
    
    // Build prefix sum array for range queries
    const prefixSum: number[] = new Array(rangeSize).fill(0);
    prefixSum[0] = frequency[0];
    for (let index = 1; index < rangeSize; index++) {
        prefixSum[index] = prefixSum[index - 1] + frequency[index];
    }
    
    let maxFrequency = 0;
    
    // Try each possible target value
    for (let targetValue = 0; targetValue < rangeSize; targetValue++) {
        // Skip if target doesn't exist and we have no operations
        if (frequency[targetValue] === 0 && numOperations === 0) {
            continue;
        }
        
        // Calculate range of values that can be adjusted to targetValue
        const leftBound = Math.max(0, targetValue - k);
        const rightBound = Math.min(rangeSize - 1, targetValue + k);
        
        // Count total numbers in the adjustable range
        const totalInRange = prefixSum[rightBound] - (leftBound > 0 ? prefixSum[leftBound - 1] : 0);
        
        // Adjacent numbers are those that can be adjusted (excluding target itself)
        const adjacentCount = totalInRange - frequency[targetValue];
        
        // Maximum frequency = existing count + operations used on adjacent numbers
        const achievableFrequency = frequency[targetValue] + Math.min(numOperations, adjacentCount);
        
        maxFrequency = Math.max(maxFrequency, achievableFrequency);
    }
    
    return maxFrequency;
};