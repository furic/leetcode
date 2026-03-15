# Digit DP + Good Number Enumeration | 55 Lines | O(log N × S) | 44ms

# Intuition
A fancy number is either (a) good itself, or (b) has a good digit sum. These two categories overlap — some good numbers also have a good digit sum. To avoid double-counting, we count "digit sum is good" via digit DP, then separately add good numbers whose digit sums are *not* good (so they'd be missed by the DP).

# Approach
- **`isGood(n)`:** Returns true for single-digit numbers or numbers whose digits are strictly monotone (all increasing or all decreasing). Scans adjacent digit pairs once.
- **Precompute all good numbers** by bitmask enumeration:
  - **Strictly increasing:** iterate `mask` over non-empty subsets of digits `1–9`; build digit string in ascending order.
  - **Strictly decreasing:** iterate `mask` over non-empty subsets of digits `0–9`; build digit string in descending order. (Subsets starting with `0` produce valid decreasing numbers like `10`, `20`, etc.)
  - Deduplicate and sort. There are at most `2^9 + 2^10 - 2 = ~1500` good numbers total, and they fit in a small list.
- **`goodNumbersWithBadDigitSum`:** Filter the precomputed list to those whose digit sum is *not* good. These are fancy only because they're good themselves — digit DP won't count them.
- **Digit DP — `countSumGood(N)`:** Count integers in `[0, N]` with a good digit sum using standard digit DP:
  - State: `(pos, digitSum, isUnbounded)` where `isUnbounded` means we've already placed a digit strictly below the limit, so remaining digits are free.
  - Memoize only unbounded states (tight states are unique per number).
  - At `pos === nStr.length`, check `isGood(digitSum)`.
  - Max `digitSum` for numbers up to ~10^9 is `9 × 9 = 81`, so the memo table is tiny.
- **`solveRange(N)`:** `countSumGood(N)` + count of `goodNumbersWithBadDigitSum` entries in `[1, N]`.
- **Answer:** `solveRange(r) - solveRange(l - 1)`.

# Complexity
- Time complexity: $$O(\log N \times S)$$ per query where $$S \leq 81$$ is the max possible digit sum — the digit DP has $$O(\log N \times S)$$ states each taking $$O(10)$$ work. Precomputation is $$O(2^{10})$$ once.

- Space complexity: $$O(\log N \times S)$$ for the DP memo table; $$O(G)$$ for the precomputed good numbers list where $$G \approx 1500$$.

# Code
```typescript []
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

const goodNumbersWithBadDigitSum = uniqueSortedGoodNumbers.filter(num => {
    let digitSum = 0;
    let temp = num;
    while (temp > 0) {
        digitSum += temp % 10;
        temp = Math.floor(temp / 10);
    }
    return !isGood(digitSum);
});

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
```