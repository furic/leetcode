const sequentialDigits = (low: number, high: number): number[] => {
    const digits = "123456789";
    const result: number[] = [];
    const minLen = String(low).length;
    const maxLen = String(high).length;

    for (let len = minLen; len <= maxLen; len++) {
        for (let i = 0; i <= 9 - len; i++) {
            const num = Number(digits.slice(i, i + len));
            if (num >= low && num <= high) result.push(num);
        }
    }

    return result;
};