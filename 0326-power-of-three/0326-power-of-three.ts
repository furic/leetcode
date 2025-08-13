const isPowerOfThree = (number: number): boolean => {
    // Powers of three are positive integers only
    if (number <= 0) return false;
    
    // Divide by 3 as many times as possible
    while (number % 3 === 0) {
        number /= 3;
    }
    
    // If we're left with 1, original number was a power of 3
    return number === 1;
};
