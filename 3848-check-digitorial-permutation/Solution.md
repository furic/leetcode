# Digit Frequency Matching | 20 Lines | O(d) | 4ms

# Intuition
A digitorial number equals the sum of its digits' factorials. Instead of generating all permutations (which is expensive), we only need to check if `n` and its factorial digit sum share the same **digit frequency** — if they do, some valid rearrangement of `n` produces the digitorial.

# Approach
- **Precompute factorials** `0!` through `10!` (max single digit is 9, but we store up to 10 for array sizing).
- **Simultaneously** iterate over each digit of `n` to:
  - Accumulate the **factorial sum** (`factorialSum`).
  - Build a **digit frequency array** `nDigitFrequency[0..9]` counting how many times each digit appears in `n`.
- Build a second frequency array `sumDigitFrequency[0..9]` by iterating over the digits of `factorialSum`.
- **Compare** both frequency arrays element by element. If every digit count matches, a valid permutation of `n` exists that equals its own factorial digit sum.
- The leading zero constraint is implicitly handled — if `sumDigitFrequency[0] > 0`, then `nDigitFrequency[0]` must also be `> 0`, meaning `n` itself contains a zero. Since `n` is a valid integer, any permutation placing a non-zero digit first is valid, and the frequency match guarantees such a digit exists (otherwise both would have no zeros and the constraint is moot).

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the number of digits in `n` — all operations scale with digit count, not the value of `n`.

- Space complexity: $$O(1)$$ — frequency arrays and factorial table are all fixed size (at most 11 elements).

# Code
```typescript []
const isDigitorialPermutation = (n: number): boolean => {
    const MAX_DIGIT = 10;
    
    const factorials: number[] = [1];
    for (let i = 1; i <= MAX_DIGIT; i++) {
        factorials[i] = factorials[i - 1] * i;
    }
    
    let factorialSum = 0;
    const nDigitFrequency = new Array(MAX_DIGIT).fill(0);
    
    for (const digitChar of n.toString()) {
        const digit = +digitChar;
        factorialSum += factorials[digit];
        nDigitFrequency[digit]++;
    }
    
    const sumDigitFrequency = new Array(MAX_DIGIT).fill(0);
    for (const digitChar of factorialSum.toString()) {
        sumDigitFrequency[+digitChar]++;
    }
    
    for (let digit = 0; digit < MAX_DIGIT; digit++) {
        if (nDigitFrequency[digit] !== sumDigitFrequency[digit]) return false;
    }
    
    return true;
};
```