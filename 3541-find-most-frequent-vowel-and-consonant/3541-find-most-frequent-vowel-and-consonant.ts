const maxFreqSum = (s: string): number => {
    const freq = new Array<number>(26).fill(0);
    const vowelIndices = new Set([0, 4, 8, 14, 20]); // a, e, i, o, u
    s.split("").map((c) => freq[c.charCodeAt(0) - "a".charCodeAt(0)]++);
    const [maxVowel, maxConsonant] = freq.reduce(
        (acc, count, index) => {
            if (vowelIndices.has(index)) {
                acc[0] = Math.max(acc[0], count);
            } else {
                acc[1] = Math.max(acc[1], count);
            }
            return acc;
        },
        [0, 0]
    );
    return maxVowel + maxConsonant;
};