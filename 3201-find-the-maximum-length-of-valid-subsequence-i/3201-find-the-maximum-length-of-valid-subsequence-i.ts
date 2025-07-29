const maximumLength = (nums: number[]): number => {
    let n = nums.length;
    let oddCount = 0;
    let evenCount = 0;
    let oddEvenAlternating = 0;
    let evenOddAlternating = 0;

    for (let i = 0; i < n; i++) {
        const isEven = nums[i] % 2 === 0;
        const isLastElement = i === n - 1;

        if (isEven) {
            evenCount++;
            const nextIsOdd = !isLastElement && nums[i + 1] % 2 === 1;
            if (isLastElement) {
                evenOddAlternating++;
            } else if (nextIsOdd) {
                evenOddAlternating += 2;
            }
        } else {
            oddCount++;
            const nextIsEven = !isLastElement && nums[i + 1] % 2 === 0;
            if (isLastElement) {
                oddEvenAlternating++;
            } else if (nextIsEven) {
                oddEvenAlternating += 2;
            }
        }
    }

    return Math.max(oddCount, evenCount, oddEvenAlternating, evenOddAlternating);
};