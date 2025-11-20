const intersectionSizeTwo = (intervals: number[][]): number => {
    // Greedy approach: sort intervals by end point
    intervals.sort((a, b) => a[1] - b[1]);
    
    const selectedNumbers: number[] = [];
    
    // Count how many selected numbers are in the given interval
    const countCoverage = (interval: number[]): number => {
        const [start, end] = interval;
        let coverageCount = 0;
        
        // Check from the end of selectedNumbers (most recent additions)
        for (let index = selectedNumbers.length - 1; index >= 0; index--) {
            const selectedNum = selectedNumbers[index];
            
            // If number is in the interval range
            if (selectedNum >= start && selectedNum <= end) {
                coverageCount++;
            }
            
            // Early termination: already found 2 numbers
            if (coverageCount >= 2) {
                return 2;
            }
            
            // If we've gone past the start, no more numbers can be in range
            if (selectedNum < start) {
                return coverageCount;
            }
        }
        
        return coverageCount;
    };
    
    // Process each interval
    for (const currentInterval of intervals) {
        const [start, end] = currentInterval;
        const coverage = countCoverage(currentInterval);
        
        if (coverage === 2) {
            // Interval already has 2 numbers, skip
            continue;
        } else if (coverage === 0) {
            // Need 2 numbers: greedily pick the two largest in range
            selectedNumbers.push(end - 1);
            selectedNumbers.push(end);
        } else if (coverage === 1) {
            // Need 1 more number
            const lastSelected = selectedNumbers[selectedNumbers.length - 1];
            
            if (lastSelected === end) {
                // Last selected is already at the end, pick second largest
                selectedNumbers.push(end - 1);
            } else {
                // Pick the largest to maximize future coverage
                selectedNumbers.push(end);
            }
            
            // Keep array sorted for efficient checking
            selectedNumbers.sort((a, b) => a - b);
        }
    }
    
    return selectedNumbers.length;
};