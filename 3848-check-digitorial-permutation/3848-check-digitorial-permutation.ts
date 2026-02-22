/**
 * Checks if any permutation of n equals the sum of factorials of its digits (digitorial)
 * Strategy: Calculate factorial sum, compare digit frequencies of n and sum
 * If frequencies match, some permutation of n is digitorial
 */
const isDigitorialPermutation = (n: number): boolean => {
    const MAX_DIGIT = 10;
    
    // Precompute factorials 0! to 10!
    const factorials: number[] = [1];
    for (let i = 1; i <= MAX_DIGIT; i++) {
        factorials[i] = factorials[i - 1] * i;
    }
    
    // Calculate sum of factorials of digits in n
    let factorialSum = 0;
    const nDigitFrequency = new Array(MAX_DIGIT).fill(0);
    
    for (const digitChar of n.toString()) {
        const digit = +digitChar;
        factorialSum += factorials[digit];
        nDigitFrequency[digit]++;
    }
    
    // Count digit frequencies in factorial sum
    const sumDigitFrequency = new Array(MAX_DIGIT).fill(0);
    for (const digitChar of factorialSum.toString()) {
        sumDigitFrequency[+digitChar]++;
    }
    
    // Check if digit frequencies match (permutation exists)
    for (let digit = 0; digit < MAX_DIGIT; digit++) {
        if (nDigitFrequency[digit] !== sumDigitFrequency[digit]) return false;
    }
    
    return true;
};