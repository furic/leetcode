const longestSubsequenceRepeatedK = (s: string, k: number): string => {
    const charFreq: Record<string, number> = {};

    // Count frequencies of each character
    for (const char of s) {
        charFreq[char] = (charFreq[char] || 0) + 1;
    }

    // Filter out characters that appear at least k times, sort descending for lexicographic priority
    const usableChars = Object.keys(charFreq)
        .filter(char => charFreq[char] >= k)
        .sort()
        .reverse();

    const queue: string[] = [...usableChars];
    let bestSubsequence = "";

    // BFS to build subsequences by adding usable characters and checking if they repeat k times as a subsequence
    while (queue.length > 0) {
        const currentSubseq = queue.shift()!;

        if (currentSubseq.length > bestSubsequence.length) {
            bestSubsequence = currentSubseq;
        }

        for (const char of usableChars) {
            const nextSubseq = currentSubseq + char;
            if (isKRepeatedInString(s, nextSubseq, k)) {
                queue.push(nextSubseq);
            }
        }
    }

    return bestSubsequence;
};

/**
 * Checks if (subseq repeated k times) is a subsequence of s.
 * Example: pattern = "ab", k = 2 → checks if "abab" is a subsequence of s.
 */
const isKRepeatedInString = (s: string, pattern: string, k: number): boolean => {
    let patternIndex = 0;
    let repeatedCount = 0;

    for (const char of s) {
        if (char === pattern[patternIndex]) {
            patternIndex++;
            if (patternIndex === pattern.length) {
                patternIndex = 0;
                repeatedCount++;
                if (repeatedCount === k) {
                    return true;
                }
            }
        }
    }

    return false;
};