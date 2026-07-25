# Top Two Digits Product | 10 Lines | O(d) | 0ms

# Intuition
The maximum product of any two digits is always the product of the two largest digits. Track them in one pass.

# Approach
- Extract digits one by one via `n % 10` and `Math.floor(n / 10)`.
- Maintain `largest` and `secondLargest`, updating both when a new digit exceeds the current largest.
- Return `largest * secondLargest`.

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the number of digits.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const maxProduct = (n: number): number => {
    let largest = 0, secondLargest = 0;

    while (n > 0) {
        const digit = n % 10;
        if (digit > largest) {
            secondLargest = largest;
            largest = digit;
        } else if (digit > secondLargest) {
            secondLargest = digit;
        }
        n = Math.floor(n / 10);
    }

    return largest * secondLargest;
};
```