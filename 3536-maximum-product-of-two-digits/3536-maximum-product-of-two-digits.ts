function maxProduct(n: number): number {
    const s = String(n).split('').sort();

    const d1 = Number(s[s.length - 2]);
    const d2 = Number(s[s.length - 1]);

    return d1 * d2;
};