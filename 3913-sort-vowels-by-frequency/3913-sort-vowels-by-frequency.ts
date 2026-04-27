const sortVowels = (s: string): string => {
    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

    const freq = new Map<string, number>();
    const firstOccurrence = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (!VOWELS.has(ch)) continue;
        freq.set(ch, (freq.get(ch) ?? 0) + 1);
        if (!firstOccurrence.has(ch)) firstOccurrence.set(ch, i);
    }

    const sortedVowels = [...freq.keys()].sort((a, b) =>
        freq.get(b)! - freq.get(a)! || firstOccurrence.get(a)! - firstOccurrence.get(b)!
    );

    // Expand each vowel by its frequency into a flat sequence
    const vowelQueue = sortedVowels.flatMap((v) => Array(freq.get(v)!).fill(v));

    let vowelIndex = 0;
    return s.split('').map((ch) => VOWELS.has(ch) ? vowelQueue[vowelIndex++] : ch).join('');
};