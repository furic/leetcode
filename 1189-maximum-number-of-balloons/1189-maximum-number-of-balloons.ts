const maxNumberOfBalloons = (text: string): number => {
    const freq: Record<string, number> = { b: 0, a: 0, l: 0, o: 0, n: 0 };
    for (const ch of text) if (ch in freq) freq[ch]++;
    return Math.floor(Math.min(freq.b, freq.a, freq.l / 2, freq.o / 2, freq.n));
};