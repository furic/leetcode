const sumZero = (n: number): number[] => {
    const result: number[] = [];

    // Add balanced pairs (i, -i)
    for (let value = 1; value <= Math.floor(n / 2); value++) {
        result.push(value, -value);
    }

    // If n is odd, add 0 to make the count correct
    if (n % 2 === 1) {
        result.push(0);
    }

    return result;
};