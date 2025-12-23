/**
 * Finds maximum sum of at most two non-overlapping events
 * Strategy: Sort by start time, use suffix array for max values, binary search for next valid event
 */
const maxTwoEvents = (events: number[][]): number => {
    const numEvents = events.length;
    
    // Sort events by start time for efficient searching
    events.sort((a, b) => a[0] - b[0]);
    
    // maxValueFromIndex[i] = maximum value among events from index i to end
    // This allows O(1) lookup of best future event
    const maxValueFromIndex = new Uint32Array(numEvents);
    maxValueFromIndex[numEvents - 1] = events[numEvents - 1][2];
    
    // Build suffix array from right to left
    for (let i = numEvents - 2; i >= 0; i--) {
        maxValueFromIndex[i] = Math.max(events[i][2], maxValueFromIndex[i + 1]);
    }
    
    let maxSum = 0;
    
    // Try each event as the first event
    for (let currentIndex = 0; currentIndex < numEvents; currentIndex++) {
        const [startTime, endTime, value] = events[currentIndex];
        
        // Binary search for the earliest event that starts after current event ends
        let left = currentIndex + 1;
        let right = numEvents - 1;
        let nextValidIndex = -1;
        
        while (left <= right) {
            const mid = (left + right) >> 1;
            
            if (events[mid][0] > endTime) {
                // This event starts after current ends - it's valid
                nextValidIndex = mid;
                right = mid - 1; // Try to find an even earlier valid event
            } else {
                // This event overlaps - search later events
                left = mid + 1;
            }
        }
        
        // Calculate sum: current event value + (optional) best future event value
        let totalValue = value;
        if (nextValidIndex !== -1) {
            totalValue += maxValueFromIndex[nextValidIndex];
        }
        
        maxSum = Math.max(maxSum, totalValue);
    }
    
    return maxSum;
};