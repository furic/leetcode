# Digit Reverse Absolute Difference | 1 Line | O(d) | 0ms

# Intuition
Reverse the digit string, parse it back to a number, and take the absolute difference. Leading zeros after reversal are handled naturally by `+` coercion (e.g. `"01"` → `1`).

# Approach
- Convert `n` to string, split into characters, reverse, rejoin, and coerce back to number with unary `+`.
- Return `Math.abs(n - reversedN)`.

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the number of digits in `n`.

- Space complexity: $$O(d)$$ — for the intermediate digit string and array.

# Code
```typescript []
const mirrorDistance = (n: number): number =>
    Math.abs(n - +n.toString().split('').reverse().join(''));
```