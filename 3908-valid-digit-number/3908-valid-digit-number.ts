const validDigit = (n: number, x: number): boolean => {
    let result = false;
    while (true) {
        result ||= x === n % 10;
        if (n < 10) {
            return n !== x && result;
        }
        n = Math.floor(n / 10);
    }
};
