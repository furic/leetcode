const countMajoritySubarrays = (nums: number[], target: number): number => {
    const arrayLength = nums.length;
    
    // Offset for prefix sum to handle negative indices
    // We add arrayLength + 1 to ensure all indices are positive
    const indexOffset = arrayLength + 1;
    
    // Current prefix sum (starts at offset to avoid negative indices)
    let currentPrefixSum = indexOffset;
    
    // Total count of valid subarrays
    let validSubarrayCount = 0;
    
    // Frequency of each prefix sum value seen so far
    // Size is 2n+2 to handle range from -(n+1) to n+1 after offset
    const prefixSumFrequency = new Array(2 * arrayLength + 2).fill(0);
    
    // Cumulative count: how many prefix sums are <= each value
    const cumulativeCountLessOrEqual = new Array(2 * arrayLength + 2).fill(0);
    
    // Initialize: empty prefix has sum 0 (which becomes indexOffset after offset)
    prefixSumFrequency[currentPrefixSum] = 1;
    cumulativeCountLessOrEqual[currentPrefixSum] = 1;
    
    for (const currentElement of nums) {
        // Update prefix sum: +1 if target, -1 otherwise
        // This transforms the "majority" problem into a "positive sum" problem
        currentPrefixSum += (currentElement === target ? 1 : -1);
        
        // Increment frequency of this prefix sum
        prefixSumFrequency[currentPrefixSum]++;
        
        // Update cumulative count at this position
        // Includes all counts up to previous position plus current frequency
        cumulativeCountLessOrEqual[currentPrefixSum] = 
            cumulativeCountLessOrEqual[currentPrefixSum - 1] + 
            prefixSumFrequency[currentPrefixSum];
        
        // Count subarrays ending at current position where target is majority
        // We need subarrays with positive sum, so we count all previous
        // positions with prefix sum strictly less than current
        validSubarrayCount += cumulativeCountLessOrEqual[currentPrefixSum - 1];
    }
    
    return validSubarrayCount;
};