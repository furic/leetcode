/**
 * Counts substrings with equal consecutive 0's and 1's
 * Strategy: Track consecutive character groups, count valid substrings between adjacent groups
 * Between groups of size m and n, we can form min(m,n) valid substrings
 */
const countBinarySubstrings = (s: string): number => {
    let totalCount = 0;
    let previousGroupSize = 0;
    let currentGroupSize = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            // Same character: extend current group
            currentGroupSize++;
        } else {
            // Different character: transition to new group
            // Add valid substrings formed between previous and current groups
            totalCount += Math.min(previousGroupSize, currentGroupSize);
            previousGroupSize = currentGroupSize;
            currentGroupSize = 1;
        }
    }

    // Add substrings formed between last two groups
    return totalCount + Math.min(previousGroupSize, currentGroupSize);
};