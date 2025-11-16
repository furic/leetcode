# Zero-Free Digit DP | 20 Lines | O(log n) | 15ms

# Intuition
After removing zeros from numbers, many numbers become identical (e.g., 10 → 1, 100 → 1, 101 → 11). The problem is equivalent to counting how many distinct zero-free positive integers exist from 1 to n. This is a classic digit DP problem where we count valid numbers under a constraint.

# Approach
- **Problem Transformation**:
  - Instead of generating all numbers and removing zeros, count zero-free numbers directly
  - A zero-free number contains only digits 1-9
  - Example: For n=10, zero-free numbers are {1,2,3,4,5,6,7,8,9}, count = 9
  
- **Digit DP Framework**:
  - Process n digit by digit from left to right
  - Build valid numbers while respecting the upper bound n
  - Use memoization to avoid recomputing identical states
  
- **State Definition**:
  - `pos`: Current digit position (0 to len-1)
  - `tight`: Boolean indicating if we're still bounded by n's digits
  - `started`: Boolean indicating if we've placed a non-zero digit yet
  
- **State Transitions**:
  - At each position, try placing digits 0-9 (or 0-limit if tight)
  - **For digit 0**:
    - If not started: continue with leading zero (doesn't count as part of number)
    - If started: skip (violates zero-free constraint)
  - **For digits 1-9**:
    - Place digit and mark started = true
    - Update tight constraint: remains true only if we placed exactly the limit digit
  
- **Tight Constraint Logic**:
  - When tight = true: can only use digits 0 to str[pos]
  - When tight = false: can use any digit 0-9
  - Becomes false once we place a digit smaller than n's corresponding digit
  - Ensures we don't exceed n
  
- **Base Case**:
  - When pos = len (processed all positions):
  - Return 1 if started = true (formed a valid number)
  - Return 0 if started = false (only had leading zeros)
  
- **Memoization**:
  - Key: combination of (pos, tight, started)
  - Total states: O(d × 2 × 2) = O(d) where d = number of digits
  - Each state computes result for all numbers sharing that prefix pattern
  
- **Example Walkthrough** (n = 102):
  - Valid zero-free numbers: 1-9, 11-19, 21-29, 31-39, 41-49, 51-59, 61-69, 71-79, 81-89, 91-99, 11, 12
  - Numbers with zeros removed that become duplicates: 10→1, 20→2, 100→1, 101→11, 102→12
  - Distinct count after deduplication matches zero-free count

# Complexity
- Time complexity: $$O(d \times 2 \times 2 \times 10)$$ = $$O(d)$$ = $$O(\log n)$$
  - d = number of digits in n = O(log n)
  - 2 possible values for tight (true/false)
  - 2 possible values for started (true/false)
  - 10 digit choices (0-9) at each position
  - Each state computed once due to memoization

- Space complexity: $$O(d)$$
  - Memoization map stores O(d × 2 × 2) = O(d) states
  - Recursion call stack depth: O(d)
  - String representation of n: O(d)

# Code
```typescript
function countDistinct(n: number): number {
    const str = n.toString();
    const len = str.length;
    const memo = new Map<string, number>();
    
    function dp(pos: number, tight: boolean, started: boolean): number {
        if (pos === len) {
            return started ? 1 : 0;
        }
        
        const key = `${pos},${tight ? 1 : 0},${started ? 1 : 0}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        const limit = tight ? parseInt(str[pos]) : 9;
        let result = 0;
        
        for (let digit = 0; digit <= limit; digit++) {
            if (digit === 0) {
                if (!started) {
                    result += dp(pos + 1, tight && (digit === limit), false);
                }
            } else {
                result += dp(pos + 1, tight && (digit === limit), true);
            }
        }
        
        memo.set(key, result);
        return result;
    }
    
    return dp(0, true, false);
}
```