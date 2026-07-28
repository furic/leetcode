const smallestPalindrome = (s: string): string => {
    const halfLen = s.length >> 1;
    const freq = new Int32Array(26);
    for (let i = 0; i < halfLen; i++) freq[s.charCodeAt(i) - 97]++;

    let left = '', right = '';
    for (let i = 0; i < 26; i++) {
        if (freq[i] > 0) {
            const chars = String.fromCharCode(i + 97).repeat(freq[i]);
            left  += chars;
            right  = chars + right;
        }
    }

    const mid = s.length % 2 !== 0 ? s[halfLen] : '';
    return left + mid + right;
};