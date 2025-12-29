/**
 * Returns the last remaining integer after alternating left-right elimination
 * Uses a mathematical formula based on bit patterns
 * 
 * @param n - The initial number of integers (1 to n)
 * @returns The last remaining integer
 */
const lastInteger = (n: number): number => {
    // For numbers larger than 2^31-1, we need BigInt to avoid overflow
    // JavaScript bitwise operations convert to 32-bit SIGNED integers
    if (n > 0x7FFFFFFF) { // 2^31 - 1 = max 32-bit signed integer
        return Number(lastIntegerBigInt(BigInt(n)));
    }
    
    // For smaller numbers, regular 32-bit operations work fine
    const ALTERNATING_BIT_MASK_32 = 0xAAAAAAAA;
    return ((n - 1) & ALTERNATING_BIT_MASK_32) + 1;
};

/**
 * BigInt version for handling large values without overflow
 * This correctly handles any size number up to 1e15
 */
const lastIntegerBigInt = (n: bigint): bigint => {
    // Create alternating bit pattern
    // We need enough bits to cover the input size
    const ALTERNATING_BIT_MASK = 0xAAAAAAAAAAAAAAAAn; // 64-bit pattern
    
    // Apply the mathematical formula
    return ((n - 1n) & ALTERNATING_BIT_MASK) + 1n;
};

/**
 * Safe wrapper that automatically handles the overflow issue
 */
const lastIntegerSafe = (n: number): number => {
    // Always use BigInt for safety with large numbers
    // This avoids any overflow issues
    if (n <= 1) return 1;
    
    const nBig = BigInt(n);
    const ALTERNATING_PATTERN = 0xAAAAAAAAAAAAAAAAn;
    const result = ((nBig - 1n) & ALTERNATING_PATTERN) + 1n;
    
    // Convert back to regular number
    return Number(result);
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