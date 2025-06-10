const maxDifference = (s: string): number => {
    const map = s.split('').reduce(
        (acc, char) => acc.set(char, (acc.get(char) || 0) + 1),
        new Map<string, number>()
    );

    const [maxOdd, minEven] = Array.from(map.values()).reduce(
        (acc, freq) => [
            Math.max(freq % 2 ? freq : 0, acc[0]),
            Math.min(freq % 2 ? Infinity : freq, acc[1]),
        ],
        [0, Infinity]
    );

    return maxOdd - minEven;
};