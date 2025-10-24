const isNumericallyBalanced = (num: number): boolean => {
    const digitFrequency = new Array(10).fill(0);
    let remainingNumber = num;
    
    // Count frequency of each digit
    while (remainingNumber > 0) {
        const digit = remainingNumber % 10;
        digitFrequency[digit]++;
        remainingNumber = Math.floor(remainingNumber / 10);
    }
    
    // Check if each digit d appears exactly d times
    for (let digit = 0; digit < 10; digit++) {
        const frequency = digitFrequency[digit];
        
        // If digit appears, it must appear exactly 'digit' times
        if (frequency > 0 && frequency !== digit) {
            return false;
        }
    }
    
    return true;
};

const nextBeautifulNumber = (n: number): number => {
    // Upper bound: largest known balanced number in valid range
    const MAX_BALANCED_NUMBER = 1224444;
    
    // Try each number starting from n+1
    for (let candidate = n + 1; candidate <= MAX_BALANCED_NUMBER; candidate++) {
        if (isNumericallyBalanced(candidate)) {
            return candidate;
        }
    }
    
    // Should never reach here given the constraints
    return -1;
};