/**
 * Adds two binary strings and returns the sum as a binary string
 * Strategy: Add digit by digit from right to left with carry propagation
 */
const addBinary = (a: string, b: string): string => {
    let indexA = a.length - 1;
    let indexB = b.length - 1;
    let carry = 0;
    let result = '';

    // Process until all digits and carry are consumed
    while (indexA >= 0 || indexB >= 0 || carry) {
        let digitSum = carry;

        if (indexA >= 0) digitSum += +a[indexA--];  // Convert char to number
        if (indexB >= 0) digitSum += +b[indexB--];

        result = (digitSum % 2) + result;           // Append current bit
        carry = Math.floor(digitSum / 2);           // Carry to next position
    }

    return result;
};