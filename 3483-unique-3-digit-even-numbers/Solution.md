# Brute Force Three-Index Enumeration | 10 Lines | O(n³) | 2ms

# Intuition
With at most 10 digits, there are at most `10 × 9 × 8 = 720` ordered triples. Simply enumerate all of them, filter for valid three-digit even numbers (no leading zero, last digit even), and count distinct values.

# Approach
- Triple nested loop over distinct index triples `(i, j, k)`.
- Skip if `digits[i] === 0` (leading zero) or `digits[k] % 2 !== 0` (not even).
- Construct the number `digits[i] * 100 + digits[j] * 10 + digits[k]` and add to a `Set`.
- Return `unique.size`.

# Complexity
- Time complexity: $$O(n^3)$$ — at most $$10^3 = 1000$$ iterations.

- Space complexity: $$O(1)$$ — at most 900 distinct values in the set (bounded constant).

# Code
```typescript []
const totalNumbers = (digits: number[]): number => {
    const n = digits.length;
    const unique = new Set<number>();

    for (let i = 0; i < n; i++) {
        if (digits[i] === 0) continue;
        for (let j = 0; j < n; j++) {
            if (j === i) continue;
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;
                if (digits[k] % 2 === 0)
                    unique.add(digits[i] * 100 + digits[j] * 10 + digits[k]);
            }
        }
    }

    return unique.size;
};
```