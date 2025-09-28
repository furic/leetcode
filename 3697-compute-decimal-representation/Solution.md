# Digit Place Value | 7 Lines | O(d) | 1ms

# Intuition
Each digit in a number represents a base-10 component at its respective place value. For example, 537 has digits 5, 3, and 7 at positions representing 500, 30, and 7 respectively.

# Approach
Convert the number to a string, then process each digit by its position. For each digit, multiply it by the appropriate power of 10 based on its position from the right. Filter out any zero components since they don't contribute to the sum, and the result is naturally in descending order.

# Complexity
- Time complexity: $$O(d)$$ where d is the number of digits
- Space complexity: $$O(d)$$

# Code
```typescript
const decimalRepresentation = (n: number): number[] =>
    n.toString()
        .split('')
        .reverse()
        .map((digit, positionIndex) => digit + '0'.repeat(positionIndex))
        .reverse()
        .map(componentString => parseInt(componentString, 10))
        .filter(component => component !== 0);
```