function minOperations(n: number): number {
    let ops = 0;
    while (n > 0) {
        if ((n & 3) === 3) {
            n += 1;
            ops++;
        } else if ((n & 1) === 1) {
            n -= 1;
            ops++;
        } else {
            n >>= 1;
        }
    }
    return ops;
}