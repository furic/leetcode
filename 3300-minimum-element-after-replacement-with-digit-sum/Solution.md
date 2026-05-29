# Digit Sum Minimum Scan | 7 Lines | O(n·d) | 1ms

# Intuition
Replace each number with its digit sum inline during a single scan, tracking the running minimum.

# Approach
- For each number, sum its digits by repeatedly taking `n % 10` and dividing by 10.
- Track the minimum digit sum across all numbers.

# Complexity
- Time complexity: $$O(n \cdot d)$$ where $$d \leq 4$$ is the max digit count (values ≤ 10000) — effectively $$O(n)$$.

- Space complexity: $$O(1)$$.

# Code
```typescript []
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
```