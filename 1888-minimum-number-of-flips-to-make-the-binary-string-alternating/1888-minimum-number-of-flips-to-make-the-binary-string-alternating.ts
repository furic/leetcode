const minFlips = (s: string): number => {
    const n = s.length;
    const doubled = s + s; // Doubling simulates all rotations via a sliding window

    let mismatchesWithPattern0 = 0;
    let minFlips = n;

    for (let i = 0; i < 2 * n; i++) {
        if (doubled[i] !== (i % 2 === 0 ? '0' : '1')) mismatchesWithPattern0++;

        // Slide window: remove contribution of the outgoing left character
        if (i >= n) {
            const leftIdx = i - n;
            if (doubled[leftIdx] !== (leftIdx % 2 === 0 ? '0' : '1')) mismatchesWithPattern0--;
        }

        // Once the window is full, evaluate both alternating patterns
        if (i >= n - 1) {
            const mismatchesWithPattern1 = n - mismatchesWithPattern0;
            minFlips = Math.min(minFlips, mismatchesWithPattern0, mismatchesWithPattern1);
        }
    }

    return minFlips;
};