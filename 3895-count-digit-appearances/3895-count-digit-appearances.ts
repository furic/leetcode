const countDigitOccurrences = (nums: number[], digit: number): number =>
    nums.reduce((totalCount, num) => {
        let remaining = num;
        while (remaining) {
            if (remaining % 10 === digit) totalCount++;
            remaining = Math.floor(remaining / 10);
        }
        return totalCount;
    }, 0);