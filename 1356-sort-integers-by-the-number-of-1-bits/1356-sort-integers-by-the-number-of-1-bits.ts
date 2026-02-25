const popcount = (n) => {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}
const sortByBits = (a) => {
    a.sort((x, y) => {
        if (x === y) return 0;
        const bx = popcount(x);
        const by = popcount(y);
        if (bx !== by) return bx - by;
        return x - y;
    });
    return a;
};