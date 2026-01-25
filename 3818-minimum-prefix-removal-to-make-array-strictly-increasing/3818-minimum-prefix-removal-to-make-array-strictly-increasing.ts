/**
 * Finds minimum prefix length to remove so remaining array is strictly increasing
 * Strategy: Find longest strictly increasing suffix from the end, remove everything before it
 */
const minimumPrefixLength = (nums: number[]): number => {
    // Find length of longest strictly increasing suffix
    let strictlyIncreasingSuffixLength = 1;
    
    // Scan backwards from second-to-last element
    // Stop when we find a violation (nums[i] >= nums[i+1])
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] >= nums[i + 1]) {
            // Found violation: nums[i] is not strictly less than next element
            break;
        }
        strictlyIncreasingSuffixLength++;
    }
    
    // Prefix to remove = total length - valid suffix length
    return nums.length - strictlyIncreasingSuffixLength;
};