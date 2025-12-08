const largestPrime = (n: number): number => {
    // Sieve of Eratosthenes - O(n log log n)
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    // Collect all primes in order
    const primes: number[] = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    
    if (primes.length === 0) return 0;
    
    let largestResult = 0;
    let sum = 0;
    
    // Calculate consecutive sums starting from 2
    for (let i = 0; i < primes.length; i++) {
        sum += primes[i];
        if (sum > n) break;
        
        // O(1) lookup if sum is prime
        if (isPrime[sum]) {
            largestResult = Math.max(largestResult, sum);
        }
    }
    
    return largestResult;
};