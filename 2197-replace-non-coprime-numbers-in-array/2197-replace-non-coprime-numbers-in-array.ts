const replaceNonCoprimes = (nums: number[]): number[] => {
    const resultStack: number[] = [];
    
    const calculateGCD = (firstNumber: number, secondNumber: number): number => {
        while (secondNumber !== 0) {
            // [firstNumber, secondNumber] = [secondNumber, firstNumber % secondNumber];
            const tmpNumber = secondNumber;
            secondNumber = firstNumber % secondNumber;
            firstNumber = tmpNumber;
        }
        return firstNumber;
    };
    
    for (let currentNumber of nums) {
        // Keep merging with stack top while they are non-coprime
        while (resultStack.length > 0) {
            const stackTop = resultStack[resultStack.length - 1];
            const greatestCommonDivisor = calculateGCD(stackTop, currentNumber);
            
            // If coprime (GCD = 1), no more merging possible
            if (greatestCommonDivisor === 1) {
                break;
            }
            
            // Merge: remove stack top and calculate LCM
            resultStack.pop();
            // LCM(a,b) = (a*b)/GCD(a,b) = (a/GCD)*b (optimized to avoid overflow)
            currentNumber = (stackTop / greatestCommonDivisor) * currentNumber;
        }
        
        resultStack.push(currentNumber);
    }
    
    return resultStack;
};