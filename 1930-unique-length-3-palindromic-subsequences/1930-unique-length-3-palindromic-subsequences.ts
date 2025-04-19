function countPalindromicSubsequence(s: string): number {
    let result = 0;
    for (const char of new Set(s)) {
        const first = s.indexOf(char), last = s.lastIndexOf(char);
        if (first < last) result += new Set(s.slice(first + 1, last)).size;
    }
    return result;
};