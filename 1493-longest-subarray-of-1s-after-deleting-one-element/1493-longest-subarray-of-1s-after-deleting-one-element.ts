const longestSubarray = (nums: number[]): number => {
    let leftPointer = 0;
    let zeroCount = 0;
    let maxLength = 0;
    
    for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
        if (nums[rightPointer] === 0) zeroCount++;
        
        // Shrink window if we have more than 1 zero (we can only delete 1)
        while (zeroCount > 1) {
            if (nums[leftPointer] === 0) zeroCount--;
            leftPointer++;
        }
        
        // Window size minus 1 (since we must delete exactly one element)
        maxLength = Math.max(maxLength, rightPointer - leftPointer);
    }
    
    return maxLength;
};