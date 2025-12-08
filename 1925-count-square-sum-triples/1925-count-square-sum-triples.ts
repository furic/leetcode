/**
 * Counts Pythagorean triples (a,b,c) where a² + b² = c² and 1 ≤ a,b,c ≤ n
 * Each valid triple is counted twice: (a,b,c) and (b,a,c)
 */
const countTriples = (n: number): number => {
    let tripleCount = 0;

    for (let a = 1; a < n; a++) {
        // Start b from a+1 to avoid checking duplicate pairs
        for (let b = a + 1; b <= n; b++) {
            const hypotenuse = Math.sqrt(a * a + b * b);

            // Early exit: if hypotenuse exceeds n, larger b values will too
            if (hypotenuse > n) break;

            // If hypotenuse is an integer ≤ n, we found a valid triple
            // Count twice: (a,b,c) and (b,a,c) are both valid
            if (Number.isInteger(hypotenuse)) {
                tripleCount += 2;
            }
        }
    }

    return tripleCount;
};