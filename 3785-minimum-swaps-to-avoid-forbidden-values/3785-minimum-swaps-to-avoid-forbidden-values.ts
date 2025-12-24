/**
 * Finds minimum swaps needed so nums[i] ≠ forbidden[i] for all i
 * Strategy: Track conflicts and value frequencies to determine feasibility and minimum swaps
 */
const minSwaps = (nums: number[], forbidden: number[]): number => {
    const arrayLength = nums.length;

    // Track total occurrences of each value across both arrays
    const totalValueCounts = new Map<number, number>();
    
    // Track occurrences of each value at conflicting positions (nums[i] === forbidden[i])
    const conflictValueCounts = new Map<number, number>();

    let totalConflictingPositions = 0;
    let maxSingleValueConflicts = 0;

    // Analyze each position
    for (let i = 0; i < arrayLength; i++) {
        const currentNum = nums[i];
        const currentForbidden = forbidden[i];

        if (currentNum === currentForbidden) {
            // Conflicting position: same value at same index in both arrays
            totalConflictingPositions++;

            // Track how many times this specific value appears in conflicts
            const conflictCount = (conflictValueCounts.get(currentNum) || 0) + 1;
            conflictValueCounts.set(currentNum, conflictCount);
            maxSingleValueConflicts = Math.max(maxSingleValueConflicts, conflictCount);

            // This value appears twice at this position (once in each array)
            const totalCount = (totalValueCounts.get(currentNum) || 0) + 2;
            if (totalCount > arrayLength) return -1; // Impossible: value appears too many times
            totalValueCounts.set(currentNum, totalCount);
        } else {
            // Non-conflicting position: different values
            
            // Count occurrence of value from nums
            const numCount = (totalValueCounts.get(currentNum) || 0) + 1;
            if (numCount > arrayLength) return -1;
            totalValueCounts.set(currentNum, numCount);

            // Count occurrence of value from forbidden
            const forbiddenCount = (totalValueCounts.get(currentForbidden) || 0) + 1;
            if (forbiddenCount > arrayLength) return -1;
            totalValueCounts.set(currentForbidden, forbiddenCount);
        }
    }

    // No conflicts means no swaps needed
    if (totalConflictingPositions === 0) return 0;

    // Minimum swaps needed is the maximum of two constraints:
    // 1. ceil(conflicts/2) - each swap can fix at most 2 conflicts
    // 2. maxSingleValueConflicts - must move each instance of most frequent conflicting value
    const minSwapsForAllConflicts = Math.ceil(totalConflictingPositions / 2);
    
    return Math.max(maxSingleValueConflicts, minSwapsForAllConflicts);
};