/**
 * Finds minimum removals to make array balanced (max ≤ k × min)
 * Strategy: Sort array, use two pointers to find optimal window
 * Keep longest suffix where max ≤ k × min, remove elements from left
 */
const minRemoval = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    const arrayLength = nums.length;
    
    let leftBoundary = 0;
    for (let rightBoundary = 0; rightBoundary < arrayLength; rightBoundary++) {
        // If current max is too large compared to current min, shrink window from left
        if (leftBoundary <= rightBoundary && nums[rightBoundary] > nums[leftBoundary] * k) {
            leftBoundary++;
        }
    }
    
    return leftBoundary;
};