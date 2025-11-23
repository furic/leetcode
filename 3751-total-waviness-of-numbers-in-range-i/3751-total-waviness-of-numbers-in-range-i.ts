const totalWaviness = (num1: number, num2: number): number => {
    let total = 0;

    for (let num = num1; num <= num2; num++) {
        const digits = num.toString().split('').map(Number);

        if (digits.length < 3) continue;

        let waviness = 0;

        for (let i = 1; i < digits.length - 1; i++) {
            const curr = digits[i];
            const prev = digits[i - 1];
            const next = digits[i + 1];

            if (curr > prev && curr > next) {
                waviness++;
            } else if (curr < prev && curr < next) {
                waviness++;
            }
        }

        total += waviness;
    }

    return total;
};