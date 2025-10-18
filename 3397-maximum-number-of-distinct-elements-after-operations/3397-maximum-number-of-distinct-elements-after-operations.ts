const maxDistinctElements = (nums: number[], k: number): number => {
    // Sort to process numbers in ascending order
    nums.sort((a, b) => a - b);
    
    let distinctCount = 0;
    let previousValue = -Infinity;

    for (const num of nums) {
        // Find the smallest valid value for current number
        // Range: [num - k, num + k], but must be > previousValue
        const minPossibleValue = num - k;
        const mustBeGreaterThan = previousValue + 1;
        const maxPossibleValue = num + k;
        
        const optimalValue = Math.min(
            Math.max(minPossibleValue, mustBeGreaterThan),
            maxPossibleValue
        );

        // Check if we can assign a distinct value
        if (optimalValue > previousValue) {
            distinctCount++;
            previousValue = optimalValue;
        }
    }

    return distinctCount;
};