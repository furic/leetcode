const smallestPalindrome = (s: string): string => {
    const freq = new Map<string, number>();
    const n = s.length;
    const halfLength = Math.floor(n / 2);

    // Count each character in the first half and double it (since it's mirrored)
    for (let i = 0; i < halfLength; i++) {
        const c = s[i];
        freq.set(c, (freq.get(c) || 0) + 1);
    }

    // If the length is odd, count the middle character once
    const mid = n % 2 === 1 ? s[halfLength] : '';

    // Sort characters for lexicographical order
    const sortedChars = Array.from(freq.keys()).sort();
    let half: string[] = [];

    for (const char of sortedChars) {
        const count = freq.get(char)!;
        half.push(char.repeat(count));
    }

    const left = half.join('');
    const right = half.reverse().join('');
    return left + mid + right;
};