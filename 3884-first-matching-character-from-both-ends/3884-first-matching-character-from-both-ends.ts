const firstMatchingIndex = (s: string): number => {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[s.length - i - 1]) return i;
    }
    return -1;
};