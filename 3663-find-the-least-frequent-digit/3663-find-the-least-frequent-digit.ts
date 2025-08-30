const getLeastFrequentDigit = (n: number): number => {
    const digits = n.toString().split("");
    const frequencyMap = new Map<string, number>();
    for (const digit of digits) {
        frequencyMap.set(digit, (frequencyMap.get(digit) || 0) + 1);
    }
    let ans = 10,
        minCount = Infinity;
    for (const [digit, count] of frequencyMap.entries()) {
        if (count <= minCount) {
            ans =
                count === minCount
                    ? Math.min(ans, Number(digit))
                    : Number(digit);
            minCount = count;
        }
    }
    return ans;
};
