function minimumDifference(nums: number[], k: number): number {
    // Edge case: if selecting one element, the difference is always 0
    if (k <= 1) return 0;
    
    // Sort the array in ascending order.
    nums.sort((a, b) => a - b);
    
    let minDiff = Infinity;
    
    // Slide a window of size k through the sorted array.
    for (let i = 0; i <= nums.length - k; i++) {
        const currentDiff = nums[i + k - 1] - nums[i];
        minDiff = Math.min(minDiff, currentDiff);
    }
    
    return minDiff;
}