/**
 * Finds maximum score across all split points
 * Score(i) = sum(0..i) - min(i+1..n-1)
 * Strategy: Iterate backwards maintaining prefix sum and suffix minimum efficiently
 */
const maximumScore = (nums: number[]): number => {
    const arrayLength = nums.length;
    let leftSum = 0;
    let maxScore = -Infinity;
    let rightMin = nums[arrayLength - 1];

    // Calculate sum of first n-1 elements (left part for split at n-2)
    for (let i = 0; i < arrayLength - 1; i++) {
        leftSum += nums[i];
    }

    // Try each split point from right to left
    for (let splitIndex = arrayLength - 2; splitIndex >= 0; splitIndex--) {
        // Score at this split: sum(0..splitIndex) - min(splitIndex+1..n-1)
        maxScore = Math.max(leftSum - rightMin, maxScore);
        
        // Update for next split (one position to the left)
        rightMin = Math.min(rightMin, nums[splitIndex]);
        leftSum -= nums[splitIndex];
    }

    return maxScore;
};