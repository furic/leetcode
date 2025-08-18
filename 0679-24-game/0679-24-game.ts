const judgePoint24 = (cards: number[]): boolean => {
    const EPSILON = 1e-6;
    const TARGET = 24.0;

    const canReach24 = (remainingNumbers: number[]): boolean => {
        // Base case: if only one number left, check if it equals 24
        if (remainingNumbers.length === 1) {
            return Math.abs(remainingNumbers[0] - TARGET) < EPSILON;
        }

        // Try all pairs of numbers
        for (let firstIndex = 0; firstIndex < remainingNumbers.length; firstIndex++) {
            for (let secondIndex = 0; secondIndex < remainingNumbers.length; secondIndex++) {
                if (firstIndex === secondIndex) continue;

                // Create new array without the two selected numbers
                const reducedNumbers: number[] = [];
                for (let index = 0; index < remainingNumbers.length; index++) {
                    if (index !== firstIndex && index !== secondIndex) {
                        reducedNumbers.push(remainingNumbers[index]);
                    }
                }

                const firstNumber = remainingNumbers[firstIndex];
                const secondNumber = remainingNumbers[secondIndex];

                // Try all possible operations between the two numbers
                const possibleResults = [
                    firstNumber + secondNumber,        // Addition
                    firstNumber - secondNumber,        // Subtraction (first - second)
                    secondNumber - firstNumber,        // Subtraction (second - first)
                    firstNumber * secondNumber         // Multiplication
                ];

                // Add division if denominators are not zero
                if (Math.abs(secondNumber) > EPSILON) {
                    possibleResults.push(firstNumber / secondNumber);
                }
                if (Math.abs(firstNumber) > EPSILON) {
                    possibleResults.push(secondNumber / firstNumber);
                }

                // Recursively try each possible result
                for (const operationResult of possibleResults) {
                    if (canReach24([...reducedNumbers, operationResult])) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    // Convert integers to floating point for precise calculations
    return canReach24(cards.map(card => card * 1.0));
};