const checkStrings = (s1: string, s2: string): boolean => {
    // Chars at even indices can only swap with even indices, odd with odd
    // Use offset 0 for even positions and 128 for odd — one pass tracks both parities
    const counts = new Int32Array(256);

    for (let i = 0; i < s1.length; i++) {
        const parityOffset = (i & 1) << 7; // 0 for even indices, 128 for odd
        counts[parityOffset + s1.charCodeAt(i)]++;
        counts[parityOffset + s2.charCodeAt(i)]--;
    }

    return counts.every(c => c === 0);
};