/**
 * Maximizes matrix sum by flipping adjacent pairs of elements
 * Key insight: We can always eliminate pairs of negatives through adjacent flips
 * If odd number of negatives remain, one must stay negative - choose the smallest absolute value
 * 
 * Strategy:
 * 1. Sum all absolute values (best case: all positive)
 * 2. If odd negatives exist, subtract 2× the smallest absolute value (forced to be negative)
 */
const maxMatrixSum = (matrix: number[][]): number => {
    let totalAbsoluteSum = 0;
    const matrixSize = matrix.length;
    let smallestAbsoluteValue = Infinity;
    let negativeCount = 0;

    // Single pass: calculate sum, count negatives, find minimum
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            const currentValue = matrix[row][col];
            const absoluteValue = Math.abs(currentValue);
            
            totalAbsoluteSum += absoluteValue;
            
            if (currentValue < 0) {
                negativeCount++;
            }
            
            smallestAbsoluteValue = Math.min(smallestAbsoluteValue, absoluteValue);
        }
    }

    // If odd number of negatives, one element must remain negative
    // Choose the smallest absolute value to minimize the loss
    if (negativeCount % 2 !== 0) {
        totalAbsoluteSum -= 2 * smallestAbsoluteValue;
    }

    return totalAbsoluteSum;
};