const bitwiseComplement = (n: number): number => {
    if (n === 0) return 1;

    const bitLength = Math.floor(Math.log2(n)) + 1;
    const allOnesMask = (1 << bitLength) - 1;

    return n ^ allOnesMask;
};