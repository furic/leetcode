const getNoZeroIntegers = (n: number): number[] => {
    for (let firstNumber = 1; firstNumber < n; firstNumber++) {
        const secondNumber = n - firstNumber;
        if (!firstNumber.toString().includes("0") && !secondNumber.toString().includes("0")) {
            return [firstNumber, secondNumber];
        }
    }
    return [];
};