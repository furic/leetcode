function maxNumberOfBalloons(text: string): number {
    const map: { [key: string]: number } = { b: 0, a: 0, l: 0, o: 0, n: 0 };
    for (const char of text) {
        if (char in map) map[char]++;
    }
    return Math.floor(Math.min(map.b, map.a, map.l / 2, map.o / 2, map.n));
}