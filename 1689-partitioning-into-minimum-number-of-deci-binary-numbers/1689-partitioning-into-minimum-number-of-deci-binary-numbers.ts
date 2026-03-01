// The largest digit determines how many deci-binary numbers are needed,
// since each position can only contribute 0 or 1 per number.
const minPartitions = (n: string): number => {
    const largestDigit = Math.max(...n.split('').map(Number));
    return largestDigit;
};