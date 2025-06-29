const generatePrimes = (max: number): boolean[] => {
    const isPrime = Array(max + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i <= max; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= max; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
};

const checkPrimeFrequency = (nums: number[]): boolean => {
    const isPrimeArray = generatePrimes(100);
    const freqs = new Map<number, number>();
    for (const num of nums) {
        freqs.set(num, (freqs.get(num) || 0) + 1);
    }
    for (const freq of freqs.values()) {
        if (isPrimeArray[freq]) return true;
    }
    return false;
};
