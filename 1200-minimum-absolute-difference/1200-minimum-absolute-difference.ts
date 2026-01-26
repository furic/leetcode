/**
 * Finds all pairs with minimum absolute difference using counting sort
 * Strategy: Counting sort is O(n + range) which can be faster than O(n log n) for small ranges
 * After sorting, minimum differences must occur between adjacent elements
 */
const minimumAbsDifference = (arr: number[]): number[][] => {
    // Find the range of values to determine counting array size
    let minValue = Infinity;
    let maxValue = -Infinity;
    
    for (const value of arr) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }
    
    // Calculate offset to handle negative numbers
    // If minValue is negative, we need to shift all indices by |minValue|
    const rangeStart = Math.min(minValue, 0);
    const indexOffset = Math.abs(rangeStart);
    const rangeSize = maxValue - rangeStart + 1;
    
    // Counting array: frequency[i] = count of (i - offset) in original array
    const frequency = new Array(rangeSize).fill(0);
    
    // Count occurrences of each value
    for (const value of arr) {
        frequency[value + indexOffset]++;
    }
    
    // Reconstruct sorted array in-place while finding minimum difference
    let minDifference = Infinity;
    let sortedWriteIndex = 0;
    
    for (let i = 0; i < frequency.length; i++) {
        if (frequency[i] > 0) {
            // Convert index back to original value
            const actualValue = i - indexOffset;
            arr[sortedWriteIndex] = actualValue;

            // Calculate difference with previous sorted element
            if (sortedWriteIndex > 0) {
                const difference = arr[sortedWriteIndex] - arr[sortedWriteIndex - 1];
                minDifference = Math.min(minDifference, difference);
            }

            sortedWriteIndex++;
        }
    }
    
    // Collect all pairs with the minimum difference
    const resultPairs: [number, number][] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === minDifference) {
            resultPairs.push([arr[i - 1], arr[i]]);
        }
    }
    
    return resultPairs;
};