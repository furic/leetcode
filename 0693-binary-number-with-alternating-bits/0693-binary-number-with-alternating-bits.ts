function hasAlternatingBits(n: number): boolean {
    return (n & (n >> 1)) == 0 && (n & (n >> 2)) == (n >> 2);
};