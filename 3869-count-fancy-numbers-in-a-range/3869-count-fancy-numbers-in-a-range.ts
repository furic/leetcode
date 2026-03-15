const isGood = (n: number): boolean => {
    if (n < 10) return true;
    const digits = n.toString();
    let isIncreasing = true, isDecreasing = true;
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] <= digits[i - 1]) isIncreasing = false;
        if (digits[i] >= digits[i - 1]) isDecreasing = false;
    }
    return isIncreasing || isDecreasing;
};

// Precompute all good numbers by enumerating strictly increasing and decreasing digit subsets
const goodNumbers: number[] = [];
for (let mask = 1; mask < (1 << 9); mask++) {
    let digitString = '';
    for (let digit = 1; digit <= 9; digit++) {
        if (mask & (1 << (digit - 1))) digitString += digit;
    }
    goodNumbers.push(parseInt(digitString, 10));
}
for (let mask = 1; mask < (1 << 10); mask++) {
    let digitString = '';
    for (let digit = 9; digit >= 0; digit--) {
        if (mask & (1 << digit)) digitString += digit;
    }
    goodNumbers.push(parseInt(digitString, 10));
}

const uniqueSortedGoodNumbers = Array.from(new Set(goodNumbers)).sort((a, b) => a - b);

// Good numbers whose digit sum is NOT good — these are fancy (via being good) but missed
// by the digit-sum DP, so they must be counted separately in solveRange
const goodNumbersWithBadDigitSum = uniqueSortedGoodNumbers.filter(num => {
    let digitSum = 0;
    let temp = num;
    while (temp > 0) {
        digitSum += temp % 10;
        temp = Math.floor(temp / 10);
    }
    return !isGood(digitSum);
});

// Digit DP: count integers in [0, N] whose digit sum is good
const countSumGood = (N: number): number => {
    if (N < 0) return 0;
    const nStr = N.toString();
    const memo: number[][] = Array.from({ length: 20 }, () => Array(150).fill(-1));

    const dp = (pos: number, digitSum: number, isUnbounded: boolean): number => {
        if (pos === nStr.length) return isGood(digitSum) ? 1 : 0;
        if (isUnbounded && memo[pos][digitSum] !== -1) return memo[pos][digitSum];

        const digitLimit = isUnbounded ? 9 : parseInt(nStr[pos]);
        let count = 0;
        for (let digit = 0; digit <= digitLimit; digit++) {
            count += dp(pos + 1, digitSum + digit, isUnbounded || digit < digitLimit);
        }

        if (isUnbounded) memo[pos][digitSum] = count;
        return count;
    };

    return dp(0, 0, false);
};

// Count fancy numbers in [0, N]: numbers with good digit sum, plus good numbers with bad digit sum
const solveRange = (N: number): number => {
    if (N < 0) return 0;
    let count = countSumGood(N);
    for (const num of goodNumbersWithBadDigitSum) {
        if (num >= 1 && num <= N) count++;
    }
    return count;
};

const countFancy = (l: number, r: number): number =>
    solveRange(r) - solveRange(l - 1);