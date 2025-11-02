const findMissingElements = (nums: number[]): number[] => {
    // Sort to process in order
    const sortedNums = [...nums].sort((a, b) => a - b);
    const missingNumbers: number[] = [];
    
    const minValue = sortedNums[0];
    const maxValue = sortedNums[sortedNums.length - 1];
    
    let expectedValue = minValue;
    let arrayIndex = 0;
    
    // Check each value in the range [minValue, maxValue]
    while (expectedValue <= maxValue) {
        if (sortedNums[arrayIndex] === expectedValue) {
            // Value exists in array, move to next array element
            arrayIndex++;
        } else {
            // Value is missing, add to result
            missingNumbers.push(expectedValue);
        }
        expectedValue++;
    }
    
    return missingNumbers;
};