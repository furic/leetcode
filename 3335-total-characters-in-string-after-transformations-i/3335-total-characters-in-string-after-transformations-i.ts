const lengthAfterTransformations = (s: string, t: number): number => {
    const MOD = 1e9 + 7;
    let counts: number[] = new Array(26).fill(0);
    for (const c of s) {
        counts[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    for (let round = 0; round < t; round++) {
        counts = [counts[25], (counts[25] + counts[0]) % MOD, ...counts.slice(1, -1)];
    }
    return counts.reduce((a, b) => ((a + b) % MOD), 0);
};