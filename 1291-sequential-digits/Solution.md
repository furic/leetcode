# Sliding Window on Digit String | 10 Lines | O(1) | 0ms

# Intuition
All sequential digit numbers are substrings of `"123456789"`. We can enumerate them all by sliding a window of each valid length across this fixed string.

# Approach
- Find the digit-length range: `minLen = len(low)`, `maxLen = len(high)`.
- For each length from `minLen` to `maxLen`, slide a window of that length across `"123456789"`. Each window gives one sequential-digit candidate.
- Filter to candidates within `[low, high]` and collect in order — outer loop by length, inner by start position guarantees sorted output.

# Complexity
- Time complexity: $$O(1)$$ — at most 36 candidates total (9 lengths × up to 9 starts each), regardless of input size.

- Space complexity: $$O(1)$$ extra — output size is bounded by the same constant.

# Code
```typescript []
const sequentialDigits = (low: number, high: number): number[] => {
    const digits = "123456789";
    const result: number[] = [];
    const minLen = String(low).length;
    const maxLen = String(high).length;

    for (let len = minLen; len <= maxLen; len++) {
        for (let i = 0; i <= 9 - len; i++) {
            const num = Number(digits.slice(i, i + len));
            if (num >= low && num <= high) result.push(num);
        }
    }

    return result;
};
```