/**
 * Finds maximum sum of a trionic subarray (increasing → decreasing → increasing)
 * Strategy: DP with three phases tracking best sum ending at each position
 * - Phase 1: Strictly increasing segment
 * - Phase 2: Phase 1 → strictly decreasing segment  
 * - Phase 3: Phase 2 → strictly increasing segment (complete trionic)
 */
const maxSumTrionic = (nums: number[]): number => {
    const arrayLength = nums.length;

    // DP arrays: max sum of each phase ending at index i
    const phaseOneSum = Array(arrayLength).fill(-Infinity);    // Increasing only
    const phaseTwoSum = Array(arrayLength).fill(-Infinity);    // Increasing → Decreasing
    const phaseThreeSum = Array(arrayLength).fill(-Infinity);  // Increasing → Decreasing → Increasing

    let maxTrionicSum = -Infinity;

    for (let i = 1; i < arrayLength; i++) {
        // Phase 1: Strictly increasing segment (l...p)
        if (nums[i] > nums[i - 1]) {
            // Either start new sequence with last 2 elements, or extend existing
            phaseOneSum[i] = Math.max(
                nums[i - 1] + nums[i],           // Start fresh
                phaseOneSum[i - 1] + nums[i]     // Extend
            );
        }

        // Phase 2: Strictly decreasing segment (p...q)
        if (nums[i] < nums[i - 1]) {
            // Transition from Phase 1 or continue Phase 2
            const transitionFromPhaseOne = phaseOneSum[i - 1] !== -Infinity
                ? phaseOneSum[i - 1] + nums[i]
                : -Infinity;
            const continuePhaseTwo = phaseTwoSum[i - 1] !== -Infinity
                ? phaseTwoSum[i - 1] + nums[i]
                : -Infinity;
            phaseTwoSum[i] = Math.max(transitionFromPhaseOne, continuePhaseTwo);
        }

        // Phase 3: Strictly increasing segment (q...r)
        if (nums[i] > nums[i - 1]) {
            // Transition from Phase 2 or continue Phase 3
            const transitionFromPhaseTwo = phaseTwoSum[i - 1] !== -Infinity
                ? phaseTwoSum[i - 1] + nums[i]
                : -Infinity;
            const continuePhaseThree = phaseThreeSum[i - 1] !== -Infinity
                ? phaseThreeSum[i - 1] + nums[i]
                : -Infinity;
            phaseThreeSum[i] = Math.max(transitionFromPhaseTwo, continuePhaseThree);
        }

        maxTrionicSum = Math.max(maxTrionicSum, phaseThreeSum[i]);
    }

    return maxTrionicSum;
};