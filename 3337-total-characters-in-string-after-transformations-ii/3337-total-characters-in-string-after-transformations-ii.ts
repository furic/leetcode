function lengthAfterTransformations(s: string, t: number, nums: number[]): number {
    const MOD = 1e9 + 7;
    const ALPHABET_SIZE = 26;
    let counts: number[] = new Array(ALPHABET_SIZE).fill(0);
    for (const c of s) {
        counts[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    for (let round = 0; round < t; round++) {
        let newCounts = new Array(ALPHABET_SIZE).fill(0);
        for (let index = 0; index < ALPHABET_SIZE; index++) {
            const count = counts[index];
            if (count !== 0) {
                for (let offset = 1; offset <= nums[index]; offset++) {
                    const targetIndex = (index + offset) % ALPHABET_SIZE;
                    console.log(index, targetIndex, newCounts[targetIndex]);
                    newCounts[targetIndex] = (newCounts[targetIndex] + count) % MOD;
                }
            }
        }
        counts = newCounts;
    }
    return counts.reduce((a, b) => ((a + b) % MOD), 0);
};