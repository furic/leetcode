const numGoodSubarrays = (nums: number[], k: number): number => {
    const prefixSumModCounts = new Map<number, number>();
    const arrayLength = nums.length;
    
    // Initialize: empty subarray has sum 0
    prefixSumModCounts.set(0, 1);
    
    let currentPrefixSumMod = 0;
    let goodSubarrayCount = 0;

    let startIndex = 0;
    
    // Process array in groups of equal consecutive values
    while (startIndex < arrayLength) {
        const currentValue = nums[startIndex];
        let groupEndIndex = startIndex;
        
        // Phase 1: Count good subarrays ending within this group
        // Use temporary sum to avoid modifying the main prefix sum yet
        let tempPrefixSumMod = currentPrefixSumMod;
        
        while (groupEndIndex < arrayLength && nums[groupEndIndex] === currentValue) {
            tempPrefixSumMod = (tempPrefixSumMod + nums[groupEndIndex]) % k;
            
            // Count subarrays: if we've seen this remainder before, those form valid subarrays
            goodSubarrayCount += prefixSumModCounts.get(tempPrefixSumMod) || 0;
            groupEndIndex++;
        }

        // Phase 2: Update prefix sum map for future groups
        // Reset to process the same group again to update the map
        groupEndIndex = startIndex;
        
        while (startIndex < arrayLength && nums[groupEndIndex] === nums[startIndex]) {
            currentPrefixSumMod = (currentPrefixSumMod + nums[groupEndIndex]) % k;
            
            // Record this prefix sum remainder for future lookups
            prefixSumModCounts.set(
                currentPrefixSumMod, 
                (prefixSumModCounts.get(currentPrefixSumMod) || 0) + 1
            );
            
            startIndex++;
        }
    }

    return goodSubarrayCount;
};