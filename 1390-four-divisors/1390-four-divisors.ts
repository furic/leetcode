/**
 * Sums divisors of numbers that have exactly 4 divisors
 * Numbers with exactly 4 divisors: p³ (prime cubed) or p×q (two distinct primes)
 * Strategy: Find the single prime factor in [2, √n], then calculate sum algebraically
 */
export const sumFourDivisors = (nums: number[]): number => {
    let totalSum = 0;
    
    for (const num of nums) {
        // Find divisors by trial division up to √num
        // If exactly one divisor found in this range → exactly 4 divisors total
        let foundDivisor = 0;
        let candidateDivisor = 2;
        
        while (candidateDivisor * candidateDivisor <= num) {
            if (num % candidateDivisor === 0) {
                if (foundDivisor === 0) {
                    // First divisor found
                    foundDivisor = candidateDivisor;
                } else {
                    // Second divisor found → more than 4 divisors total
                    foundDivisor = 0;
                    break;
                }
            }
            candidateDivisor++;
        }
        
        // Check if we have exactly 4 divisors
        // foundDivisor !== 0: exactly one divisor found in [2, √num]
        // foundDivisor² !== num: not a perfect square (avoids p² which has 3 divisors: 1, p, p²)
        if (foundDivisor !== 0 && foundDivisor * foundDivisor !== num) {
            // Two cases that give exactly 4 divisors:
            // 1. p × q (two distinct primes): divisors are 1, p, q, p×q
            // 2. p³ (prime cubed): divisors are 1, p, p², p³
            const smallerFactor = foundDivisor;
            const largerFactor = num / smallerFactor;
            
            // Sum of divisors: 1 + smallerFactor + largerFactor + num
            totalSum += 1 + smallerFactor + largerFactor + num;
        }
    }
    
    return totalSum;
};