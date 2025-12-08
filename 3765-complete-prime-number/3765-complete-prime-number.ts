const completePrime = (num: number): boolean => {
    const isPrime = (n: number): boolean => {
        if (n <= 1) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    };
    
    const str = num.toString();
    const n = str.length;
    
    // Check all prefixes (first k digits)
    for (let i = 1; i <= n; i++) {
        const prefix = parseInt(str.substring(0, i));
        if (!isPrime(prefix)) return false;
    }
    
    // Check all suffixes (last k digits)
    for (let i = 1; i <= n; i++) {
        const suffix = parseInt(str.substring(n - i));
        if (!isPrime(suffix)) return false;
    }
    
    return true;
};