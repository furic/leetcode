const countNoZeroPairs = (n: number): number => {
    const targetNumberString = n.toString();
    const targetNumberLength = targetNumberString.length;
    
    // Convert to array of digits, reversed for processing from least significant digit
    const targetDigits = targetNumberString
        .split('')
        .map(Number)
        .reverse();
    
    // Memoization cache for dynamic programming
    const memoCache = new Map<string, number>();
    
    /**
     * Recursively counts valid ways to form two no-zero numbers that sum to target
     * @param digitPosition - Current digit position (0 = ones place, 1 = tens place, etc.)
     * @param carryOver - Carry from previous digit addition
     * @param firstNumberLength - Length of first no-zero number
     * @param secondNumberLength - Length of second no-zero number
     * @returns Number of valid ways to complete the sum from this state
     */
    const countValidCombinations = (
        digitPosition: number,
        carryOver: number,
        firstNumberLength: number,
        secondNumberLength: number
    ): number => {
        // Base case: processed all digits
        if (digitPosition === targetNumberLength) {
            // Valid only if no remaining carry
            return carryOver === 0 ? 1 : 0;
        }
        
        // Create memoization key
        const cacheKey = `${digitPosition}-${carryOver}-${firstNumberLength}-${secondNumberLength}`;
        if (memoCache.has(cacheKey)) {
            return memoCache.get(cacheKey)!;
        }
        
        // Determine valid digit ranges for both numbers at current position
        // If position is within the number's length, digits must be 1-9 (no zeros)
        // Otherwise, the digit is implicitly 0 (number has fewer digits than position)
        const firstNumberDigitRange = digitPosition < firstNumberLength 
            ? Array.from({ length: 9 }, (_, i) => i + 1)  // [1, 2, ..., 9]
            : [0];
        
        const secondNumberDigitRange = digitPosition < secondNumberLength
            ? Array.from({ length: 9 }, (_, i) => i + 1)  // [1, 2, ..., 9]
            : [0];
        
        let totalWays = 0;
        
        // Try all valid digit combinations
        for (const firstDigit of firstNumberDigitRange) {
            for (const secondDigit of secondNumberDigitRange) {
                const digitSum = firstDigit + secondDigit + carryOver;
                const resultDigit = digitSum % 10;
                const nextCarry = Math.floor(digitSum / 10);
                
                // Check if this combination produces the correct digit at current position
                if (resultDigit === targetDigits[digitPosition]) {
                    totalWays += countValidCombinations(
                        digitPosition + 1,
                        nextCarry,
                        firstNumberLength,
                        secondNumberLength
                    );
                }
            }
        }
        
        memoCache.set(cacheKey, totalWays);
        return totalWays;
    };
    
    let totalValidPairs = 0;
    
    // Try all possible length combinations for the two no-zero numbers
    for (let firstNumLength = 1; firstNumLength <= targetNumberLength; firstNumLength++) {
        for (let secondNumLength = 1; secondNumLength <= targetNumberLength; secondNumLength++) {
            totalValidPairs += countValidCombinations(0, 0, firstNumLength, secondNumLength);
        }
    }
    
    return totalValidPairs;
};