const maximumLengthSubstring = (s: string): number => {
    const freq = new Array(26).fill(0);
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 97;
        freq[idx]++;

        while (freq[idx] > 2) freq[s.charCodeAt(left++) - 97]--;

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};