function countPrimeSetBits(left: number, right: number): number {
    const primeNumbersInProvidedRange = [2, 3, 5, 7, 11, 13, 17, 19];
    let countOfNumbersWithPrimeNumberOfSetBits = 0;

    for (let i = left; i <= right; i++) {
        let num = i;
        let countOfSetBits = 0;
        while (num > 0) {
            num = num & (num - 1);
            countOfSetBits++;
        }
        if (primeNumbersInProvidedRange.includes(countOfSetBits)) {
            countOfNumbersWithPrimeNumberOfSetBits++;
        }
    }

    return countOfNumbersWithPrimeNumberOfSetBits;
};