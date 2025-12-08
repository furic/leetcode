/**
 * Finds the largest prime ≤ n that can be expressed as a sum of consecutive primes starting from 2
 * Strategy: Build running sum of consecutive primes, track largest sum that is also prime
 */
const largestPrime = (n: number): number => {
    /**
     * Checks if a number is prime using trial division with 6k±1 optimization
     */
    const isPrime = (num: number): boolean => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;

        // Check divisors of form 6k±1 up to √num
        for (let divisor = 5; divisor * divisor <= num; divisor += 6) {
            if (num % divisor === 0 || num % (divisor + 2) === 0) {
                return false;
            }
        }

        return true;
    };

    if (n < 2) return 0;

    let candidateNumber = 2;
    let consecutivePrimeSum = 0;
    let largestValidPrime = 0;

    while (true) {
        if (isPrime(candidateNumber)) {
            consecutivePrimeSum += candidateNumber;

            // If sum exceeds n, we've checked all possible sums
            if (consecutivePrimeSum > n) return largestValidPrime;

            // If the sum itself is prime, it's a valid candidate
            if (isPrime(consecutivePrimeSum)) {
                largestValidPrime = consecutivePrimeSum;
            }
        }
        
        candidateNumber++;
    }
};