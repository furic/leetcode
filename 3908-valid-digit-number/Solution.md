# Digit Scan Leading Check | 8 Lines | O(d) | 0ms

# Intuition
Scan digits from least significant to most significant. Track whether `x` appears anywhere, and at the end check that the most significant digit (the last `n` before the loop exits) is not `x`.

# Approach
- Loop: accumulate whether `x` appears in any digit via `result ||= x === n % 10`. When `n < 10`, we're at the leading digit — return `n !== x && result` (leading digit must not be `x`, and `x` must have appeared somewhere).
- The loop naturally terminates at the leading digit since `n < 10` after all divisions.

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the number of digits in `n`.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const validDigit = (n: number, x: number): boolean => {
    let result = false;
    while (true) {
        result ||= x === n % 10;
        if (n < 10) {
            return n !== x && result;
        }
        n = Math.floor(n / 10);
    }
};
```