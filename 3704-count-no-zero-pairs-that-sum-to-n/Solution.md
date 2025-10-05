# Digit Dynamic Programming | 73 Lines | O(d³ × 9²) | 1521ms

# Intuition
We need to count pairs of positive integers without zeros that sum to n. A brute force approach of checking every possible pair would be too slow for large n. Instead, we can use digit dynamic programming to build valid numbers digit by digit while ensuring they sum correctly.

# Approach
**Core Strategy:**
- Process the target number n digit by digit, from least significant (rightmost) to most significant (leftmost)
- Build two numbers simultaneously that must sum to n, ensuring neither contains a zero digit
- Use dynamic programming with memoization to avoid recomputing the same subproblems

**Step 1: Setup and Preprocessing**
- Convert n to a string to access individual digits
- Reverse the digit array so index 0 represents the ones place, index 1 the tens place, etc.
- This makes it easier to process carries naturally from right to left

**Step 2: Length Enumeration**
- Try all possible length combinations for the two numbers
- Both numbers can have lengths from 1 to d (where d is the number of digits in n)
- This gives us d² different length combinations to explore

**Step 3: Digit-by-Digit Construction (Recursive Function)**
- Start at position 0 (ones place) with no initial carry
- At each position, determine what digits are valid for each number:
  - If the position is within the number's length: digits must be 1-9 (no zeros allowed)
  - If the position exceeds the number's length: the digit is implicitly 0 (number is shorter)
- Try all combinations of valid digits (up to 9×9 = 81 combinations per position)

**Step 4: Validation Logic**
- For each digit pair (d1, d2), calculate: sum = d1 + d2 + carry
- Extract the result digit: sum % 10
- Calculate the new carry: floor(sum / 10)
- Only proceed if the result digit matches the target digit at this position
- Recursively solve for the next position with the new carry

**Step 5: Base Case and Termination**
- When we've processed all digit positions (reached the end of n):
  - Return 1 if carry is 0 (valid complete sum)
  - Return 0 if carry is non-zero (numbers sum to more than n)

**Step 6: Memoization**
- Cache results using a key: (position, carry, length1, length2)
- This prevents recalculating the same state multiple times
- The same state can be reached through different digit combinations

**Step 7: Accumulation**
- Sum up all valid ways across all length combinations
- Each valid path through the recursion tree represents one valid pair (a, b)

**Why This Works:**
- By fixing the lengths upfront, we know exactly which positions must be non-zero
- Processing right-to-left with carry mirrors how addition actually works
- Memoization ensures we only calculate each unique state once
- The constraint that digits must be 1-9 (not 0) is enforced by the digit ranges

# Complexity
- Time complexity: $$O(d^3 \times 81)$$ where d is the number of digits in n (d² length combinations, d positions, 81 digit pair combinations)
- Space complexity: $$O(d^3)$$ for memoization cache

# Code
```typescript
const countNoZeroPairs = (n: number): number => {
    const targetNumberString = n.toString();
    const targetNumberLength = targetNumberString.length;
    
    const targetDigits = targetNumberString
        .split('')
        .map(Number)
        .reverse();
    
    const memoCache = new Map<string, number>();
    
    const countValidCombinations = (
        digitPosition: number,
        carryOver: number,
        firstNumberLength: number,
        secondNumberLength: number
    ): number => {
        if (digitPosition === targetNumberLength) {
            return carryOver === 0 ? 1 : 0;
        }
        
        const cacheKey = `${digitPosition}-${carryOver}-${firstNumberLength}-${secondNumberLength}`;
        if (memoCache.has(cacheKey)) {
            return memoCache.get(cacheKey)!;
        }
        
        const firstNumberDigitRange = digitPosition < firstNumberLength 
            ? Array.from({ length: 9 }, (_, i) => i + 1)
            : [0];
        
        const secondNumberDigitRange = digitPosition < secondNumberLength
            ? Array.from({ length: 9 }, (_, i) => i + 1)
            : [0];
        
        let totalWays = 0;
        
        for (const firstDigit of firstNumberDigitRange) {
            for (const secondDigit of secondNumberDigitRange) {
                const digitSum = firstDigit + secondDigit + carryOver;
                const resultDigit = digitSum % 10;
                const nextCarry = Math.floor(digitSum / 10);
                
                if (resultDigit === targetDigits[digitPosition]) {
                    totalWays += countValidCombinations(
                        digitPosition + 1,
                        nextCarry,
                        firstNumberLength,
                        secondNumberLength
                    );
                }
            }
        }
        
        memoCache.set(cacheKey, totalWays);
        return totalWays;
    };
    
    let totalValidPairs = 0;
    
    for (let firstNumLength = 1; firstNumLength <= targetNumberLength; firstNumLength++) {
        for (let secondNumLength = 1; secondNumLength <= targetNumberLength; secondNumLength++) {
            totalValidPairs += countValidCombinations(0, 0, firstNumLength, secondNumLength);
        }
    }
    
    return totalValidPairs;
};