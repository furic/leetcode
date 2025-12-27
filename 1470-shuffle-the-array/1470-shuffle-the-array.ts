/**
 * Interleaves two halves of an array into alternating elements
 * Given [x1,x2,...,xn,y1,y2,...,yn], returns [x1,y1,x2,y2,...,xn,yn]
 */
const shuffle = (nums: number[], n: number): number[] => {
    const shuffledArray: number[] = [];
    
    // Interleave elements from first half (x values) and second half (y values)
    for (let pairIndex = 0; pairIndex < n; pairIndex++) {
        // Place x value at even position (0, 2, 4, ...)
        shuffledArray[pairIndex * 2] = nums[pairIndex];
        // Place corresponding y value at odd position (1, 3, 5, ...)
        shuffledArray[pairIndex * 2 + 1] = nums[pairIndex + n];
    }
    
    return shuffledArray;
};