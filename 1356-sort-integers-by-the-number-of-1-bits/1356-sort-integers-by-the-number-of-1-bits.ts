const popcount = (n: number): number => {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
};

const sortByBits = (arr: number[]): number[] =>
    arr.sort((x, y) => popcount(x) - popcount(y) || x - y);