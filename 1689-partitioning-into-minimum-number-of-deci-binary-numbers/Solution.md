# Max Digit Scan | 5 Lines | O(d) | 0ms

# Intuition
Each deci-binary number contributes at most `1` to any digit position. So to build a digit `d` at some position, we need at least `d` deci-binary numbers. The bottleneck is the largest digit in `n`.

# Approach
- Scan digits from `9` down to `1`.
- Return the first digit value found in `n` — this is the maximum digit, which is the minimum number of deci-binary numbers required.
- We scan high-to-low and return immediately for a clean early exit, avoiding a full `Math.max` pass (though both are equivalent in complexity).
- Digit `0` never needs to be checked since it contributes nothing to the required count.

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the number of digits in `n` — at most 9 `includes` calls each scanning the string once, so effectively $$O(9d) = O(d)$$.

- Space complexity: $$O(1)$$ — no extra storage used.

# Code
```typescript []
const minPartitions = (n: string): number => {
    for (let digit = 9; digit > 0; digit--) {
        if (n.includes(digit.toString())) return digit;
    }
};
```