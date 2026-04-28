const minOperations = (grid: number[][], x: number): number => {
    const values = grid.flat();
    const targetMod = values[0] % x;

    for (const v of values)
        if (v % x !== targetMod) return -1;

    values.sort((a, b) => a - b);
    const median = values[Math.floor(values.length / 2)];

    let ops = 0;
    for (const v of values) ops += Math.abs(v - median) / x;
    return ops;
};