const isDigitorialPermutation = (n: number): boolean => {
    const factorialCache = new Map<number, number>([[0, 1], [1, 1]]);

    const getFactorial = (digit: number): number => {
        if (factorialCache.has(digit)) return factorialCache.get(digit)!;
        const result = digit * getFactorial(digit - 1);
        factorialCache.set(digit, result);
        return result;
    };

    const getDigitCounts = (num: number): Map<number, number> => {
        const digitCounts = new Map<number, number>();
        for (const char of num.toString()) {
            const digit = Number(char);
            digitCounts.set(digit, (digitCounts.get(digit) ?? 0) + 1);
        }
        return digitCounts;
    };

    const digits = n.toString().split('').map(Number);
    const factorialSum = digits.reduce((sum, digit) => sum + getFactorial(digit), 0);

    const nDigitCounts = getDigitCounts(n);
    const factorialSumDigitCounts = getDigitCounts(factorialSum);

    if (nDigitCounts.size !== factorialSumDigitCounts.size) return false;

    for (const [digit, count] of nDigitCounts) {
        if (factorialSumDigitCounts.get(digit) !== count) return false;
    }

    return true;
};