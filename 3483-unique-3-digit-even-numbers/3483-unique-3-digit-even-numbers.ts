const totalNumbers = (digits: number[]): number => {
    const n = digits.length;
    const unique = new Set<number>();

    for (let i = 0; i < n; i++) {
        if (digits[i] === 0) continue; // no leading zeros
        for (let j = 0; j < n; j++) {
            if (j === i) continue;
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;
                if (digits[k] % 2 === 0)
                    unique.add(digits[i] * 100 + digits[j] * 10 + digits[k]);
            }
        }
    }

    return unique.size;
};