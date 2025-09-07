# Balanced Pair Generation | 17 Lines | O(n) | 0ms

# Intuition
To create `n` unique integers that sum to zero, pairing positive and negative integers ensures the sum remains balanced. If `n` is odd, including `0` balances the count while maintaining a sum of zero.

# Approach
1. Compute half of `n`.  
2. Generate pairs `(i, -i)` from `1` to `floor(n/2)`.  
3. If `n` is odd, append `0` to the result.  
4. Return the resulting array.

# Complexity
- Time complexity: $$O(n)$$  
- Space complexity: $$O(n)$$  

# Code
```typescript
const sumZero = (n: number): number[] => {
    const result: number[] = [];
    const half = Math.floor(n / 2);

    for (let value = 1; value <= half; value++) {
        result.push(value, -value);
    }

    if (n % 2 === 1) {
        result.push(0);
    }

    return result;
};
```