/**
 * Counts numbers in range with prime number of set bits
 * Strategy: For each number, count set bits using bit manipulation, then check primality
 */
const countPrimeSetBits = (left: number, right: number): number => {
    let numbersWithPrimeBitCount = 0;
    
    for (let number = left; number <= right; number++) {
        // Count set bits using Brian Kernighan's algorithm
        let tempValue = number;
        let setBitsCount = 0;
        while (tempValue > 0) {
            tempValue &= tempValue - 1;  // Remove rightmost set bit
            setBitsCount++;
        }
        
        // Check if setBitsCount is prime (skip if less than 2)
        if (setBitsCount < 2) continue;
        
        let isPrime = true;
        for (let divisor = 2; divisor <= Math.sqrt(setBitsCount); divisor++) {
            if (setBitsCount % divisor === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) numbersWithPrimeBitCount++;
    }
    
    return numbersWithPrimeBitCount;
};