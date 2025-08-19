const zeroFilledSubarray = (nums: number[]): number => {
    let totalSubarrays = 0;
    let consecutiveZeros = 0;
    
    for (const currentNumber of nums) {
        if (currentNumber === 0) {
            // Extend the current streak of zeros
            consecutiveZeros++;
            
            // Add number of new subarrays ending at current position
            // If we have n consecutive zeros, we can form n subarrays ending here
            totalSubarrays += consecutiveZeros;
        } else {
            // Reset streak when we encounter a non-zero
            consecutiveZeros = 0;
        }
    }
    
    return totalSubarrays;
};