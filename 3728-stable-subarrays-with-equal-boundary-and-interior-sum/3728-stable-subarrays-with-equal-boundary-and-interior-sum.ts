const countStableSubarrays = (capacity: number[]): number => {
    const n = capacity.length;
    
    // Build prefix sums
    const prefixSums = new Array<number>(n);
    prefixSums[0] = capacity[0];
    for (let i = 1; i < n; i++) {
        prefixSums[i] = prefixSums[i - 1] + capacity[i];
    }
    
    let count = 0;
    
    // Map: "value,prefixSum" -> count of occurrences
    const map = new Map<string, number>();
    
    for (let j = 2; j < n; j++) {
        // Add position j-2 to map (ensures i and j are at least 2 apart)
        const i = j - 2;
        const key = `${capacity[i]},${prefixSums[i]}`;
        map.set(key, (map.get(key) || 0) + 1);
        
        // Find all valid left endpoints for right endpoint j
        const targetPrefixSum = prefixSums[j - 1] - capacity[j];
        const targetKey = `${capacity[j]},${targetPrefixSum}`;
        count += map.get(targetKey) || 0;
    }
    
    return count;
};