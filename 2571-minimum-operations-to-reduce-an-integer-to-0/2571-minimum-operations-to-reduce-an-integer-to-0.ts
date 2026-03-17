function minOperations(n: number): number {
    let ans: number = 0;
    while ((n & n - 1) !== 0) {
        while ((n & 1) === 0) {
            n >>= 1;
        }
        (n >> 1) % 2 ? n++ : n--;
        ans++;
    }
    return ans + 1;
};