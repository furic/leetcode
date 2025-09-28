const splitArray = (nums: number[]): number => {
    const arrayLength = nums.length;
    
    // Track which positions can be end of strictly increasing sequence from left
    const canEndIncreasingSequence = new Array<boolean>(arrayLength);
    // Track which positions can be start of strictly decreasing sequence to right
    const canStartDecreasingSequence = new Array<boolean>(arrayLength);
    
    // Build increasing sequence flags from left to right
    canEndIncreasingSequence[0] = true;
    for (let i = 1; i < arrayLength; i++) {
        const isCurrentGreaterThanPrevious = nums[i] > nums[i - 1];
        const canPreviousEndIncreasingSequence = canEndIncreasingSequence[i - 1];
        canEndIncreasingSequence[i] = isCurrentGreaterThanPrevious && canPreviousEndIncreasingSequence;
    }
    
    // Build decreasing sequence flags from right to left
    canStartDecreasingSequence[arrayLength - 1] = true;
    for (let i = arrayLength - 2; i >= 0; i--) {
        const isCurrentGreaterThanNext = nums[i] > nums[i + 1];
        const canNextStartDecreasingSequence = canStartDecreasingSequence[i + 1];
        canStartDecreasingSequence[i] = isCurrentGreaterThanNext && canNextStartDecreasingSequence;
    }
    
    // Calculate prefix sums for efficient range sum queries
    const prefixSums = new Array<number>(arrayLength);
    prefixSums[0] = nums[0];
    for (let i = 1; i < arrayLength; i++) {
        prefixSums[i] = prefixSums[i - 1] + nums[i];
    }
    
    let minimumAbsoluteDifference = Number.MAX_SAFE_INTEGER;
    
    // Try each possible split point
    for (let splitIndex = 0; splitIndex < arrayLength - 1; splitIndex++) {
        const canSplitHere = canEndIncreasingSequence[splitIndex] && 
                            canStartDecreasingSequence[splitIndex + 1];
        
        if (canSplitHere) {
            const leftSum = prefixSums[splitIndex];
            const rightSum = prefixSums[arrayLength - 1] - prefixSums[splitIndex];
            const absoluteDifference = Math.abs(leftSum - rightSum);
            
            minimumAbsoluteDifference = Math.min(minimumAbsoluteDifference, absoluteDifference);
        }
    }
    
    return minimumAbsoluteDifference === Number.MAX_SAFE_INTEGER ? -1 : minimumAbsoluteDifference;
};