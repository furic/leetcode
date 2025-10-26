const maxSumOfSquares = (num: number, sum: number): string => {
    // Check if it's possible to form such a number
    // sum must be at least 1 (positive integer) and at most 9*num
    if (sum < 1 || sum > 9 * num) {
        return "";
    }
    
    const digits: number[] = [];
    let remainingSum = sum;
    
    // Greedily assign the maximum digit (up to 9) at each position
    for (let i = 0; i < num; i++) {
        const digit = Math.min(9, remainingSum);
        digits.push(digit);
        remainingSum -= digit;
    }
    
    return digits.join('');
};