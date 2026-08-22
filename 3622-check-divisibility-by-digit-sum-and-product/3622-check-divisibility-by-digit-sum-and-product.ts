const checkDivisibility = (n: number): boolean => {
    let digitSum = 0, digitProduct = 1, rem = n;

    while (rem > 0) {
        const digit = rem % 10;
        digitSum += digit;
        digitProduct *= digit;
        rem = Math.floor(rem / 10);
    }

    return n % (digitSum + digitProduct) === 0;
};