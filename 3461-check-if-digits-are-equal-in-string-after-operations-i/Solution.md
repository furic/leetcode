# In-Place Iterative Reduction | 19 Lines | O(n²) | 4ms

# Intuition
We need to repeatedly reduce the string by computing sums of adjacent digits modulo 10 until only two digits remain. This is a simulation problem where each iteration reduces the array length by 1, similar to Pascal's triangle construction but with modulo 10 arithmetic.

# Approach
**Iterative In-Place Reduction:**
- Simulate the reduction process by repeatedly computing new digits from adjacent pairs
- Reuse the same array space to store intermediate results (in-place modification)
- Continue until exactly 2 digits remain, then compare them

**Step-by-Step Process:**

1. **Parse Input:**
   - Convert string to array of individual digit characters for easy manipulation
   - Track original length to determine number of iterations needed

2. **Reduction Loop Structure:**
   - Need exactly (n - 2) iterations to reduce from n digits to 2 digits
   - Each iteration reduces array length by 1:
     - Start: n digits
     - After iter 1: n-1 digits
     - After iter 2: n-2 digits
     - ...
     - After iter (n-2): 2 digits

3. **Single Iteration Logic:**
   - For current array of length L, produce array of length L-1
   - For each position i from 0 to L-2:
     - Calculate: (digit[i] + digit[i+1]) % 10
     - Store result back at position i (overwriting original)
   - After loop, positions [0, L-2] contain new values, position L-1 is unused

4. **In-Place Optimization:**
   - Reuse the same array instead of creating new arrays each iteration
   - Write new values to the beginning of the array
   - Old values beyond the active range become irrelevant

5. **Final Comparison:**
   - After all iterations, digits[0] and digits[1] contain the final two digits
   - Return whether they are equal

**Why This Works:**

- **Correctness:**
  - Each iteration correctly implements the adjacency rule
  - In-place updates work because we only read positions [i] and [i+1] to write to [i]
  - By the time we read [i+1], we've already used its original value

- **Triangle Pattern:**
  - This creates a structure similar to Pascal's triangle:
```
  3  9  0  2
   2  9  2
    1  1
```
  - Each level computes sums of adjacent pairs from the level above

**Example Walkthrough (s = "3902"):**

- Initial: digits = ['3','9','0','2'], n=4, need 2 iterations

- **Iteration 1** (remainingDigits=3):
  - pos=0: (3+9)%10=2 → digits=['2','9','0','2']
  - pos=1: (9+0)%10=9 → digits=['2','9','0','2']
  - pos=2: (0+2)%10=2 → digits=['2','9','2','2']
  - Result: ['2','9','2',_] (ignore position 3)

- **Iteration 2** (remainingDigits=2):
  - pos=0: (2+9)%10=1 → digits=['1','9','2','2']
  - pos=1: (9+2)%10=1 → digits=['1','1','2','2']
  - Result: ['1','1',_,_] (ignore positions 2-3)

- Final: digits[0]='1', digits[1]='1' → equal → return true

**Edge Cases:**
- String of length 2: No iterations needed, directly compare
- All same digits: Result depends on arithmetic pattern
- Single digit: Invalid input (n ≥ 2 per constraints)

# Complexity
- Time complexity: $$O(n^2)$$ where n is string length - outer loop runs (n-2) times, inner loop runs O(n) times with decreasing lengths: (n-1) + (n-2) + ... + 1 = O(n²)
- Space complexity: $$O(n)$$ for the digits array (in-place modification, no extra arrays created)

# Code
```typescript
const hasSameDigits = (s: string): boolean => {
    const digitCount = s.length;
    const digits: string[] = s.split("");

    for (let iteration = 1; iteration <= digitCount - 2; iteration++) {
        const remainingDigits = digitCount - iteration;
        
        for (let position = 0; position < remainingDigits; position++) {
            const currentDigit = parseInt(digits[position]);
            const nextDigit = parseInt(digits[position + 1]);
            const sumModulo = (currentDigit + nextDigit) % 10;
            
            digits[position] = String(sumModulo);
        }
    }
    
    return digits[0] === digits[1];
};
```