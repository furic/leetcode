const largestGoodInteger = (num: string): string => {
    const goodDigits: number[] = [];
    
    // Find all digits that appear 3 times consecutively
    for (let i = 0; i < num.length - 2; i++) {
        if (num[i] === num[i + 1] && num[i + 1] === num[i + 2]) {
            goodDigits.push(parseInt(num[i]));
        }
    }
    
    // Return the largest good integer as a 3-digit string, or empty string if none found
    if (goodDigits.length > 0) {
        const largestDigit = Math.max(...goodDigits);
        return largestDigit.toString().repeat(3);
    }
    
    return "";
};