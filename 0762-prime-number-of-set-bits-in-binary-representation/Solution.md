# Bit Count + Primality Check | 27 Lines | O(n × √log n) | 4ms

# Intuition

For each number in range, count set bits using Brian Kernighan's algorithm, then check if count is prime. Count numbers where set bit count is prime.

# Approach

**Two-Step Per Number:**

1. **Count Set Bits**: Brian Kernighan's algorithm
   - `n & (n-1)` removes rightmost set bit
   - Repeat until n=0
   - Efficient: O(k) where k = number of set bits

2. **Check Primality**: Trial division
   - Test divisors from 2 to √count
   - Skip if count < 2 (not prime)

**Optimization Opportunity:**
- Max set bits for 10⁶ is ≤20
- Could precompute primes {2,3,5,7,11,13,17,19}
- Use lookup instead of computation

**Example: left=6, right=10**

Process:
- 6 (110): 2 bits → prime ✓
- 7 (111): 3 bits → prime ✓
- 8 (1000): 1 bit → not prime ✗
- 9 (1001): 2 bits → prime ✓
- 10 (1010): 2 bits → prime ✓

Result: 4 ✓

# Complexity

- Time complexity: $$O(n \times \sqrt{\log(\max)})$$
  - n = right - left + 1 numbers
  - Per number: count bits O(log max) + primality O(√log max)
  - Overall: O(n × √log max)
  - Since max ≤ 10⁶, log max ≤ 20, this is efficient

- Space complexity: $$O(1)$$
  - Only counter variables
  - No additional data structures

# Code
```typescript []
const countPrimeSetBits = (left: number, right: number): number => {
    let numbersWithPrimeBitCount = 0;
    
    for (let number = left; number <= right; number++) {
        let tempValue = number;
        let setBitsCount = 0;
        while (tempValue > 0) {
            tempValue &= tempValue - 1;
            setBitsCount++;
        }
        
        if (setBitsCount < 2) continue;
        
        let isPrime = true;
        for (let divisor = 2; divisor <= Math.sqrt(setBitsCount); divisor++) {
            if (setBitsCount % divisor === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) numbersWithPrimeBitCount++;
    }
    
    return numbersWithPrimeBitCount;
};
```