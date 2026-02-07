/**
 * Finds minimum deletions to make string balanced (no 'b' before 'a')
 * Strategy: DP tracking min deletions at each position
 * For each 'a': either delete all previous 'b's, or delete this 'a'
 */
const minimumDeletions = (s: string): number => {
    let bsSeenCount = 0;      // Count of 'b's encountered so far
    let minDeletions = 0;     // Min deletions to balance string up to current position

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            // Two choices when seeing 'a':
            // 1. Delete all 'b's before this 'a' → cost = bsSeenCount
            // 2. Delete this 'a' → cost = minDeletions + 1
            minDeletions = Math.min(bsSeenCount, minDeletions + 1);
        } else {
            // Seeing 'b': increment count (might need to delete later if 'a's follow)
            bsSeenCount++;
        }
    }

    return minDeletions;
};