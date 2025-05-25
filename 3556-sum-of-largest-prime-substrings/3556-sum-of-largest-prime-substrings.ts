const sumOfLargestPrimes = (s: string): number => {
    const isPrime = (num: number): boolean => {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        const sqrt = Math.floor(Math.sqrt(num));
        for (let i = 3; i <= sqrt; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const primes = new Set<number>();

    const n = s.length;
    for (let i = 0; i < n; i++) {
        let numStr = "";
        for (let j = i; j < n; j++) {
            numStr += s[j];
            // Remove leading zeros
            const num = Number(numStr);
            if (!primes.has(num) && isPrime(num)) {
                primes.add(num);
            }
        }
    }

    const sortedPrimes = Array.from(primes).sort((a, b) => b - a);
    return sortedPrimes.slice(0, 3).reduce((acc, val) => acc + val, 0);
};
