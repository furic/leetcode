/**
 * Returns the last remaining integer after alternating left-right elimination
 * Uses a mathematical formula based on bit patterns
 * 
 * @param n - The initial number of integers (1 to n)
 * @returns The last remaining integer
 */
const lastInteger = (n: number): number => {
    // JavaScript bitwise operations work on 32-bit integers
    // Use 0xAAAAAAAA for 32-bit alternating pattern: 10101010...
    const ALTERNATING_BIT_MASK_32 = 0xAAAAAAAA;
    
    // This formula gives the position of the last survivor
    // It's based on the mathematical pattern of the elimination process
    return ((n - 1) & ALTERNATING_BIT_MASK_32) + 1;
};

/**
 * BigInt version for handling very large values of n (up to 1e15)
 * This correctly handles 64-bit patterns
 */
const lastIntegerBigInt = (n: bigint): bigint => {
    // Create alternating bit pattern for 64 bits
    // 0xAAAAAAAAAAAAAAAA = 1010101010...10 (32 pairs of '10')
    const ALTERNATING_BIT_MASK_64 = 0xAAAAAAAAAAAAAAAAn;
    
    // Apply the mathematical formula
    return ((n - 1n) & ALTERNATING_BIT_MASK_64) + 1n;
};

/**
 * Wrapper function that automatically chooses the right implementation
 */
const lastIntegerAuto = (n: number | bigint): number => {
    if (typeof n === 'bigint') {
        return Number(lastIntegerBigInt(n));
    }
    
    // For large numbers that need BigInt precision
    if (n > Number.MAX_SAFE_INTEGER) {
        return Number(lastIntegerBigInt(BigInt(n)));
    }
    
    // For regular numbers, use 32-bit operations
    return lastInteger(n);
};

/**
 * Alternative implementation showing the simulation approach
 * (for understanding the pattern, not optimal for large n)
 */
const lastIntegerSimulation = (n: number): number => {
    if (n === 1) return 1;
    
    let startPosition = 1;  // 1-indexed position of first element
    let remainingCount = n;
    let eliminateFromLeft = true;
    let stepSize = 1;  // Distance between consecutive elements
    
    while (remainingCount > 1) {
        // When eliminating from left, or from right with odd count,
        // the start position moves
        if (eliminateFromLeft || remainingCount % 2 === 1) {
            startPosition += stepSize;
        }
        
        // After each round, half the elements remain
        remainingCount = Math.floor(remainingCount / 2);
        
        // Double the step size (elements are now further apart)
        stepSize *= 2;
        
        // Alternate the direction
        eliminateFromLeft = !eliminateFromLeft;
    }
    
    return startPosition;
};