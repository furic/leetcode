const maxProduct = (n: number): number => {
    const sortedDigits = n
        .toString()
        .split("")
        .map(Number)
        .sort((a, b) => b - a);
    return sortedDigits[0] * sortedDigits[1];
};
