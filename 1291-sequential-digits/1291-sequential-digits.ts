function sequentialDigits(low: number, high: number): number[] {
    const digits = "123456789";
    const res: number[] = [];

    const n = String(low).length;
    const m = String(high).length;

    for (let length = n; length <= m; length++) {
        for (let i = 0; i < 10 - length; i++) {
            const num = Number(digits.slice(i, i + length));

            if (low <= num && num <= high) {
                res.push(num);
            }
        }
    }

    return res;
}