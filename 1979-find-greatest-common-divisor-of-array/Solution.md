# Min Max GCD | 4 Lines | O(n + log V) | 0ms

# Intuition
Find the min and max, then compute their GCD using the Euclidean algorithm.

# Approach
- `Math.min(...nums)` and `Math.max(...nums)` give the two values.
- Standard iterative Euclidean: `while b ≠ 0: (a, b) = (b, a % b)`. Return `a`.

# Complexity
- Time complexity: $$O(n + \log V)$$ — $$O(n)$$ for min/max, $$O(\log V)$$ for GCD.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const findGCD = (nums: number[]): number => {
    let a = Math.min(...nums);
    let b = Math.max(...nums);
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a;
};
```