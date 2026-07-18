const findGCD = (nums: number[]): number => {
    let a = Math.min(...nums);
    let b = Math.max(...nums);
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a;
};