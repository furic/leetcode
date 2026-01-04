# Trial Division to √n | 26 Lines | O(n√m) | 9ms

# Intuition

A number has exactly 4 divisors in two cases: (1) p³ where p is prime (divisors: 1, p, p², p³), or (2) p×q where p,q are distinct primes (divisors: 1, p, q, p×q). By checking divisors up to √n, if we find exactly one divisor, we can determine if the number qualifies and compute the divisor sum algebraically.

# Approach

**Key Insight:**
- Numbers with 4 divisors have a special structure
- Check divisors from 2 to √n
- If exactly one divisor d found in this range and d² ≠ n, then n has exactly 4 divisors

**Algorithm:**
1. For each number, trial divide by candidates 2 to √n
2. Count divisors found in this range:
   - 0 divisors: n is prime (2 divisors total)
   - 1 divisor d where d² ≠ n: exactly 4 divisors (either p³ or p×q)
   - 1 divisor d where d² = n: n is perfect square (3 or more divisors)
   - 2+ divisors: more than 4 divisors total
3. If exactly 4 divisors: sum = 1 + d + (n/d) + n

**Example: num=21**
- Check 2: 21%2 ≠ 0
- Check 3: 21%3 = 0, foundDivisor = 3
- Check 4: 4² = 16 ≤ 21, 21%4 ≠ 0
- Check 5: 5² = 25 > 21, stop
- Found exactly one divisor (3) in range [2,√21]
- 3² = 9 ≠ 21, so 21 has exactly 4 divisors
- Divisors: 1, 3, 7, 21
- Sum: 1 + 3 + 7 + 21 = 32 ✓

# Complexity

- Time complexity: $$O(n \times \sqrt{m})$$
  - n = array length
  - m = maximum value in array
  - Per number: trial division up to √m
  - Overall: O(n√m)

- Space complexity: $$O(1)$$
  - Only scalar variables
  - No additional data structures

# Code
```typescript []
export const sumFourDivisors = (nums: number[]): number => {
    let totalSum = 0;
    
    for (const num of nums) {
        let foundDivisor = 0;
        let candidateDivisor = 2;
        
        while (candidateDivisor * candidateDivisor <= num) {
            if (num % candidateDivisor === 0) {
                if (foundDivisor === 0) {
                    foundDivisor = candidateDivisor;
                } else {
                    foundDivisor = 0;
                    break;
                }
            }
            candidateDivisor++;
        }
        
        if (foundDivisor !== 0 && foundDivisor * foundDivisor !== num) {
            const smallerFactor = foundDivisor;
            const largerFactor = num / smallerFactor;
            totalSum += 1 + smallerFactor + largerFactor + num;
        }
    }
    
    return totalSum;
};
```