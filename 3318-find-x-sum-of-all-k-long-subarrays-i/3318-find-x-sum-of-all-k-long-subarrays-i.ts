const findXSum = (nums: number[], k: number, x: number): number[] => {
    const arrayLength = nums.length;
    const result: number[] = [];
    
    // Process each sliding window of size k
    for (let windowStart = 0; windowStart + k <= arrayLength; windowStart++) {
        // Count frequency of each value in current window (values are 1-50)
        const frequencyCount = new Array(51).fill(0);
        let windowSum = 0;
        
        for (let index = windowStart; index < windowStart + k; index++) {
            frequencyCount[nums[index]]++;
            windowSum += nums[index];
        }
        
        // Build list of [frequency, value] pairs for non-zero frequencies
        const frequencyValuePairs: [number, number][] = [];
        for (let value = 1; value <= 50; value++) {
            if (frequencyCount[value] > 0) {
                frequencyValuePairs.push([frequencyCount[value], value]);
            }
        }
        
        // If distinct elements <= x, x-sum is just the window sum
        if (frequencyValuePairs.length <= x) {
            result.push(windowSum);
        } else {
            // Sort by frequency (desc), then by value (desc) as tiebreaker
            frequencyValuePairs.sort((a, b) => {
                return b[0] - a[0] || b[1] - a[1];
            });
            
            // Calculate x-sum: sum of top x most frequent elements
            let xSum = 0;
            for (let rank = 0; rank < x; rank++) {
                const [frequency, value] = frequencyValuePairs[rank];
                xSum += frequency * value;
            }
            
            result.push(xSum);
        }
    }
    
    return result;
};