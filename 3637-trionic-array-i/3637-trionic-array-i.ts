/**
 * Checks if array is trionic (has three segments: increasing, decreasing, increasing)
 * All segments must be strictly monotonic and non-empty
 * Strategy: Greedily consume each segment, validate constraints at each step
 */
const isTrionic = (nums: number[]): boolean => {
    let currentIndex = 0;
    const arrayLength = nums.length;

    // Phase 1: Consume strictly increasing segment
    while (currentIndex + 1 < arrayLength && nums[currentIndex] < nums[currentIndex + 1]) { currentIndex++; }
    if (currentIndex === 0 || currentIndex === arrayLength - 1) return false;

    // Phase 2: Consume strictly decreasing segment
    while (currentIndex + 1 < arrayLength && nums[currentIndex] > nums[currentIndex + 1]) { currentIndex++; }
    if (currentIndex === arrayLength - 1) return false;

    // Phase 3: Consume strictly increasing segment
    while (currentIndex + 1 < arrayLength && nums[currentIndex] < nums[currentIndex + 1]) { currentIndex++; }
    return currentIndex === arrayLength - 1;
};