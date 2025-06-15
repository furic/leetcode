const maxDiff = (num: number): number => {
    const digits = num.toString().split('').map(Number);
    const n = digits.length;

    // For maximum: replace first non-9 digit with 9
    let maxDigits = [...digits];
    for (let i = 0; i < n; i++) {
        if (maxDigits[i] !== 9) {
            const from = maxDigits[i];
            maxDigits = maxDigits.map(d => d === from ? 9 : d);
            break;
        }
    }

    // For minimum: replace first digit (≠1/0) with 1 if first is not 1; otherwise replace next ≠0/1 with 0
    let minDigits = [...digits];
    if (minDigits[0] !== 1) {
        const from = minDigits[0];
        minDigits = minDigits.map(d => d === from ? 1 : d);
    } else {
        for (let i = 1; i < n; i++) {
            if (minDigits[i] !== 0 && minDigits[i] !== 1) {
                const from = minDigits[i];
                minDigits = minDigits.map(d => d === from ? 0 : d);
                break;
            }
        }
    }

    const maxNum = Number(maxDigits.join(''));
    const minNum = Number(minDigits.join(''));

    return maxNum - minNum;
};