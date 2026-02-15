const firstUniqueFreq = (nums: number[]): number => {
    // Step 1: Count frequency of each element
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Step 2: Count how many elements have each frequency
    const freqCount = new Map<number, number>();
    for (const freq of freqMap.values()) {
        freqCount.set(freq, (freqCount.get(freq) || 0) + 1);
    }
    
    // Step 3: Find first element (left to right) with unique frequency
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) continue; // Skip duplicates in scan
        seen.add(num);
        
        const freq = freqMap.get(num)!;
        if (freqCount.get(freq) === 1) {
            return num;
        }
    }
    
    return -1;
};