/**
 * Finds minimum difference between highest and lowest scores when selecting k students
 * Strategy: Sort array, then use sliding window of size k to find minimum range
 * In a sorted array, the minimum range of k elements is always a contiguous subarray
 */
const minimumDifference = (nums: number[], k: number): number => {
    // Edge case: selecting 1 student has 0 difference
    if (k === 1) return 0;

    // Sort scores in ascending order
    nums.sort((a, b) => a - b);
    
    const numStudents = nums.length;
    let minDifference = Infinity;

    // Sliding window: try all contiguous groups of k students
    for (let windowStart = 0; windowStart <= numStudents - k; windowStart++) {
        // In sorted array, difference = last element - first element in window
        const windowEnd = windowStart + k - 1;
        const windowDifference = nums[windowEnd] - nums[windowStart];
        
        minDifference = Math.min(minDifference, windowDifference);
    }
    
    return minDifference;
};