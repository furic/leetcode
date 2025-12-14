/**
 * Counts stable subarrays (no inversions) within query ranges
 * A stable subarray has no pair i < j where nums[i] > nums[j]
 * 
 * Strategy: Precompute where inversions occur, then for each query range:
 * - If no inversion in range: all subarrays are stable (n*(n+1)/2 formula)
 * - If inversion exists: split calculation at the inversion point
 */
export const countStableSubarrays = (nums: number[], queries: number[][]): number[] => {
    const arrayLength = nums.length;
    const numQueries = queries.length;

    // stableCountUpTo[i] = total count of stable subarrays ending at or before index i
    // This is a cumulative sum of "streak lengths" at each position
    const stableCountUpTo: number[] = new Array(arrayLength);
    stableCountUpTo[0] = 1; // Single element is always stable

    // Build prefix sum by tracking consecutive non-decreasing streaks
    let currentStreakLength = 1;
    for (let i = 1; i < arrayLength; i++) {
        if (nums[i] >= nums[i - 1]) {
            // Streak continues: increment length
            currentStreakLength++;
        } else {
            // Streak breaks: restart from 1
            currentStreakLength = 1;
        }
        
        // Add current streak length to cumulative count
        stableCountUpTo[i] = stableCountUpTo[i - 1] + currentStreakLength;
    }

    // firstInversionAfter[i] = index of first position where nums[j] < nums[j-1] for j > i
    // If no inversion exists after i, stores arrayLength as sentinel
    const firstInversionAfter: number[] = new Array(arrayLength);
    firstInversionAfter[arrayLength - 1] = arrayLength; // No inversion after last element

    // Build inversion index array from right to left
    for (let i = arrayLength - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) {
            // Inversion found immediately after current position
            firstInversionAfter[i] = i + 1;
        } else {
            // No immediate inversion: inherit from next position
            firstInversionAfter[i] = firstInversionAfter[i + 1];
        }
    }

    // Process each query
    const results: number[] = new Array(numQueries);
    for (let i = 0; i < numQueries; i++) {
        const [left, right] = queries[i];

        // Find where the first inversion occurs in the query range
        const breakPoint = firstInversionAfter[left];
        
        if (breakPoint > right) {
            // No inversion in [left, right]: entire range is stable
            // Count all possible subarrays: n*(n+1)/2 where n = range length
            const rangeLength = right - left + 1;
            results[i] = (rangeLength * (rangeLength + 1)) / 2;
        } else {
            // Inversion exists: split calculation at the break point
            
            // Part 1: Count stable subarrays in [left, breakPoint-1]
            // All subarrays in this prefix are stable
            const lengthBeforeBreak = breakPoint - left;
            const countBeforeBreak = (lengthBeforeBreak * (lengthBeforeBreak + 1)) / 2;
            
            // Part 2: Count stable subarrays that start at or after breakPoint
            // Use precomputed cumulative counts
            const countAfterBreak = stableCountUpTo[right] - stableCountUpTo[breakPoint - 1];
            
            results[i] = countBeforeBreak + countAfterBreak;
        }
    }

    return results;
};