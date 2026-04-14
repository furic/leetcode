const countDigitOccurrences = (nums: number[], digit: number): number =>
    nums.reduce((total, n) => {
        for (const ch of n.toString()) if (Number(ch) === digit) total++;
        return total;
    }, 0);