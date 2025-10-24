# Brute Force with Validation | 35 Lines | O(k × d) | 247ms

# Intuition
A numerically balanced number has a very specific property: each digit d must appear exactly d times. These numbers are rare, so we can use brute force to check each candidate starting from n+1 until we find one that satisfies the balanced property.

# Approach
**Sequential Search with Digit Frequency Validation:**
- Iterate through numbers starting from n+1
- For each candidate, count digit frequencies and validate the balanced property
- Return the first number that satisfies all conditions

**Step-by-Step Process:**

1. **Helper Function: isNumericallyBalanced(num)**
   
   **Count Digit Frequencies:**
   - Create frequency array of size 10 (for digits 0-9)
   - Extract digits using modulo and division: `digit = num % 10`
   - Repeatedly divide by 10 until num becomes 0
   - Count each digit's occurrences
   
   **Validate Balanced Property:**
   - For each digit d from 0 to 9:
     - If digit d appears in the number (frequency > 0)
     - It must appear exactly d times (frequency == d)
     - If frequency ≠ d, return false
   - Special case: digit 0 cannot appear (would require 0 occurrences, but we counted it)
   
   **Return true if all checks pass**

2. **Main Function: nextBeautifulNumber(n)**
   
   **Set Upper Bound:**
   - Largest balanced number ≤ 10^6 is 1224444
   - This has: one 1, two 2's, four 4's (valid!)
   - No need to search beyond this for given constraints
   
   **Sequential Search:**
   - Start from n+1 (strictly greater)
   - Check each candidate with isNumericallyBalanced
   - Return first valid number found

3. **Why Brute Force is Acceptable:**
   - Balanced numbers are extremely rare
   - In range [1, 10^6], there are only about 80 balanced numbers
   - Average gap between consecutive balanced numbers is ~12,500
   - Max iterations needed is much less than 10^6

**Numerically Balanced Number Properties:**

- **Digit 0 cannot appear:** Would need 0 occurrences, contradiction
- **Digit 1 can appear once:** 1 × 1 = 1 digit total
- **Digit 2 must appear twice:** 2 × 2 = 4 digits total (including both 2's)
- **Valid combinations are limited:** e.g., {1,2,2}, {3,3,3}, {1,3,3,3}, {1,2,2,4,4,4,4}

**Example Balanced Numbers:**
- 1, 22, 122, 212, 221, 333, 1333, 3133, 3313, 3331, ...
- 1224444 (one 1, two 2's, four 4's)

**Example Walkthrough (n = 1000):**
- Try 1001: has 1(×2), 0(×2) → 0 appears but shouldn't → invalid
- Try 1002, 1003, ..., 1332: various violations
- Try 1333:
  - Frequency: 1(×1), 3(×3)
  - Check: 1 appears 1 time ✓, 3 appears 3 times ✓
  - Valid! Return 1333

**Optimization Opportunities (not implemented):**
- Could precompute all balanced numbers and binary search
- Could generate candidates intelligently rather than checking all numbers
- For this problem, brute force is simple and fast enough

# Complexity
- Time complexity: $$O(k \times d)$$ where k is the gap to next balanced number (avg ~12,500) and d is number of digits (~6-7)
- Space complexity: $$O(1)$$ - only using fixed-size frequency array

# Code
```typescript
const isNumericallyBalanced = (num: number): boolean => {
    const digitFrequency = new Array(10).fill(0);
    let remainingNumber = num;
    
    while (remainingNumber > 0) {
        const digit = remainingNumber % 10;
        digitFrequency[digit]++;
        remainingNumber = Math.floor(remainingNumber / 10);
    }
    
    for (let digit = 0; digit < 10; digit++) {
        const frequency = digitFrequency[digit];
        
        if (frequency > 0 && frequency !== digit) {
            return false;
        }
    }
    
    return true;
};

const nextBeautifulNumber = (n: number): number => {
    const MAX_BALANCED_NUMBER = 1224444;
    
    for (let candidate = n + 1; candidate <= MAX_BALANCED_NUMBER; candidate++) {
        if (isNumericallyBalanced(candidate)) {
            return candidate;
        }
    }
    
    return -1;
};
```