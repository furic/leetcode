const LIMIT = 1000;

// Precompute all "taxicab numbers" (expressible as sum of two cubes in 2+ ways)
const cubeSumFreq = new Map<number, number>();
for (let b = 1; b <= LIMIT; b++) {
    for (let a = 1; a <= b; a++) {
        const sum = a ** 3 + b ** 3;
        cubeSumFreq.set(sum, (cubeSumFreq.get(sum) ?? 0) + 1);
    }
}

const goodIntegers = [...cubeSumFreq.entries()]
    .filter(([_, freq]) => freq >= 2)
    .map(([val]) => val)
    .sort((a, b) => a - b);

const findGoodIntegers = (n: number): number[] => {
    const end = goodIntegers.findIndex(val => val > n);
    return end === -1 ? [...goodIntegers] : goodIntegers.slice(0, end);
};