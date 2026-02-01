/**
 * Finds minimum cost to divide array into 3 contiguous subarrays
 * Cost of subarray = its first element
 * Strategy: First subarray cost is fixed (nums[0]), find two smallest remaining elements
 */
const minimumCost = (nums: number[]): number => {
    const firstSubarrayCost = nums[0];
    
    // Find the two smallest values in nums[1..n-1]
    // These will be the first elements of the second and third subarrays
    let secondSmallest = Infinity;
    let smallest = Infinity;
    
    for (let index = 1; index < nums.length; index++) {
        const currentValue = nums[index];
        
        if (currentValue < smallest) {
            // Found new smallest: shift current smallest to second smallest
            secondSmallest = smallest;
            smallest = currentValue;
        } else if (currentValue < secondSmallest) {
            // Found new second smallest (but not smaller than smallest)
            secondSmallest = currentValue;
        }
    }
    
    return firstSubarrayCost + smallest + secondSmallest;
};