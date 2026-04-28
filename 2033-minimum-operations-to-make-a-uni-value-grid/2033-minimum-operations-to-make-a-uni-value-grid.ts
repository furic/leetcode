const minOperations = (grid: number[][], x: number): number => {
    const values = grid.flat().sort((a, b) => a - b);
    const targetMod = values[0] % x;

    if (values.some(v => v % x !== targetMod)) return -1;

    const median = values[Math.floor(values.length / 2)];
    return values.reduce((ops, v) => ops + Math.abs(v - median) / x, 0);
};