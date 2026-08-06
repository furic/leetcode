function smallestNumber(n: number, t: number): number {
    for (let i = n; i < n + 1000; i++) {
        let x = i;
        let product = 1;

        while (x > 0) {
            product *= x % 10;
            x = Math.floor(x / 10);
        }

        if (product % t === 0) {
            return i;
        }
    }

    return -1;
};