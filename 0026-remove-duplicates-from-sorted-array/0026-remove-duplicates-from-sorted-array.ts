/**
 * Removes duplicates from a sorted array in-place
 * Uses two-pointer technique to overwrite duplicates with unique elements
 * Returns the count of unique elements
 */
const removeDuplicates = (nums: number[]): number => {
    // Edge case: empty array
    if (nums.length === 0) return 0;
    
    // writePosition: where to place the next unique element
    // Start at 1 since first element is always unique
    let writePosition = 1;
    
    // Scan from second element onwards
    for (let readPosition = 1; readPosition < nums.length; readPosition++) {
        // Found a new unique element (different from previous)
        if (nums[readPosition] !== nums[readPosition - 1]) {
            nums[writePosition] = nums[readPosition];
            writePosition++;
        }
    }
    
    // writePosition now equals the count of unique elements
    return writePosition;
};