const minElement = (nums: number[]): number => {
    let minDigitSum = Infinity;

    for (const num of nums) {
        let digitSum = 0;
        for (let n = num; n > 0; n = Math.floor(n / 10))
            digitSum += n % 10;
        minDigitSum = Math.min(minDigitSum, digitSum);
    }

    return minDigitSum;
};