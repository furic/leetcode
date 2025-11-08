const minimumOneBitOperations = (n: number): number => {
    let operationCount = 0;
    let shouldAdd = true;
    let remainingNumber = n;

    // Process each set bit from highest to lowest
    while (remainingNumber > 0) {
        // Find the position of the highest set bit
        const highestBitPosition = Math.floor(Math.log2(remainingNumber));
        const highestBitValue = 2 ** highestBitPosition;
        
        // Operations needed to clear a single bit at position k: 2^(k+1) - 1
        // This follows the Gray code pattern
        const operationsForThisBit = highestBitValue * 2 - 1;
        
        if (shouldAdd) {
            operationCount += operationsForThisBit;
        } else {
            operationCount -= operationsForThisBit;
        }
        
        // Remove the highest bit and process remaining bits
        remainingNumber -= highestBitValue;
        
        // Alternate between adding and subtracting (Gray code property)
        shouldAdd = !shouldAdd;
    }

    return operationCount;
};