# Sieve with Prefix Sum | 20 Lines | O(n log log n) |

# Intuition
We need to find the largest prime ≤ n that equals the sum of consecutive primes starting from 2. Using the Sieve of Eratosthenes to precompute all primes, we can then check each consecutive sum and verify if it's prime in O(1) time.

# Approach
- **Phase 1: Generate All Primes**:
  - Use Sieve of Eratosthenes to find all primes up to n
  - Mark composites by iterating multiples of each prime
  - Store boolean array isPrime for O(1) primality checks

- **Phase 2: Collect Prime List**:
  - Build ordered list of primes from isPrime array
  - This list will be used to compute consecutive sums
  - Primes are naturally in ascending order

- **Phase 3: Compute Consecutive Sums**:
  - Always start from first prime (2)
  - Compute running sum: 2, 2+3, 2+3+5, 2+3+5+7, ...
  - For each sum ≤ n, check if it's prime using isPrime array
  - Track the largest prime sum found

- **Why This Works**:
  - All consecutive prime sums starting from 2 are considered
  - We don't need to check other starting points (problem specifies start from 2)
  - isPrime lookup is O(1) after preprocessing
  - Early termination when sum > n

- **Sieve of Eratosthenes Details**:
  - Mark 0 and 1 as non-prime
  - For each prime i, mark all multiples starting from i²
  - Only check up to √n since larger factors would have been marked
  - Time complexity: O(n log log n)

- **Example Walkthrough** (n=20):
  - Primes: [2, 3, 5, 7, 11, 13, 17, 19]
  - sum=2: isPrime[2]=true, largest=2
  - sum=5 (2+3): isPrime[5]=true, largest=5
  - sum=10 (2+3+5): isPrime[10]=false, largest=5
  - sum=17 (2+3+5+7): isPrime[17]=true, largest=17
  - sum=28 (2+3+5+7+11) > 20, stop
  - Result: 17 ✓

- **Edge Cases Handled**:
  - n < 2: No primes, return 0
  - n = 2: Prime 2 itself, return 2
  - No consecutive sum is prime: return 0
  - Large n: Early break when sum exceeds n

# Complexity
- Time complexity: $$O(n \log \log n)$$
  - Sieve of Eratosthenes: O(n log log n)
  - Collect primes: O(n) to scan isPrime array
  - Compute sums: O(π(n)) where π(n) ≈ n/ln(n) is prime count
  - Each sum check: O(1)
  - Total dominated by sieve: O(n log log n)

- Space complexity: $$O(n)$$
  - isPrime boolean array: O(n)
  - primes list: O(π(n)) ≈ O(n/log n)
  - Total: O(n)

# Code
```typescript
const largestPrime = (n: number): number => {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    const primes: number[] = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    
    if (primes.length === 0) return 0;
    
    let largestResult = 0;
    let sum = 0;
    
    for (let i = 0; i < primes.length; i++) {
        sum += primes[i];
        if (sum > n) break;
        
        if (isPrime[sum]) {
            largestResult = Math.max(largestResult, sum);
        }
    }
    
    return largestResult;
};
```