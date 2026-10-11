const lengthOfLongestSubstring = (s: string): number => {
    const lastSeen = new Int32Array(128).fill(-1);
    let windowStart = 0;
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        windowStart = Math.max(windowStart, lastSeen[code] + 1);
        maxLen = Math.max(maxLen, i - windowStart + 1);
        lastSeen[code] = i;
    }

    return maxLen;
};