const getWordsInLongestSubsequence = (words: string[], groups: number[]): string[] => {
    const n = groups.length;
    const dp = new Array(n).fill(1);
    const prev = new Array(n).fill(-1);
    let maxIndex = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (
                groups[i] !== groups[j] &&
                dp[i] < dp[j] + 1 &&
                isOneCharDifferent(words[i], words[j])
            ) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > dp[maxIndex]) {
            maxIndex = i;
        }
    }

    const result: string[] = [];
    for (let i = maxIndex; i >= 0; i = prev[i]) {
        result.push(words[i]);
    }
    
    return result.reverse();
};

const isOneCharDifferent = (s1: string, s2: string): boolean => {
    if (s1.length !== s2.length) {
        return false;
    }
    let diff = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            if (++diff > 1) {
                return false;
            }
        }
    }
    return diff === 1;
}