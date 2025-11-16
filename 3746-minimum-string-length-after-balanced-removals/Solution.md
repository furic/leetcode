# Balance Counting | 6 Lines | O(n) | 3ms

# Intuition
The key insight is that any substring with equal counts of 'a' and 'b' can be removed. What remains must be the excess characters that cannot be paired. The minimum length equals the absolute difference between total 'a's and total 'b's.

# Approach
- **Core Observation**:
  - Any substring where count('a') = count('b') can be removed
  - Order of removal doesn't matter for the final result
  - What cannot be removed are unpaired characters
  
- **Balance Tracking Strategy**:
  - Treat 'a' as +1 and 'b' as -1
  - Maintain a running balance counter starting at 0
  - For each 'a': increment balance
  - For each 'b': decrement balance
  
- **Why This Works**:
  - Positive balance means excess 'a's remain
  - Negative balance means excess 'b's remain
  - Zero balance means all characters can be perfectly paired and removed
  - The absolute value of final balance gives the count of unpaired characters
  
- **Mathematical Proof**:
  - Total 'a' count = countA
  - Total 'b' count = countB
  - Maximum pairs we can form = min(countA, countB)
  - Characters we can remove = 2 × min(countA, countB)
  - Remaining characters = total - 2 × min(countA, countB)
  - Simplifies to: max(countA, countB) - min(countA, countB) = |countA - countB|
  
- **Example Walkthrough** ("aaabb"):
  - 'a': balance = 1
  - 'a': balance = 2
  - 'a': balance = 3
  - 'b': balance = 2
  - 'b': balance = 1
  - Final result: |1| = 1 (one unmatched 'a' remains)
  
- **Why Order Doesn't Matter**:
  - We can remove balanced substrings in any order
  - The final count of unpaired characters is always the same
  - Example: "aabb" can be removed as "aa|bb" or "ab|ab" or entire "aabb" - all lead to 0

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string
  - Constant time operation per character
  - No nested loops or recursive calls

- Space complexity: $$O(1)$$
  - Only one integer variable for balance tracking
  - No additional data structures needed
  - Input string is not modified

# Code
```typescript
const minLengthAfterRemovals = (s: string): number => {
    let balance = 0;
    for (const char of s) {
        balance += char === 'a' ? 1 : -1;
    }
    return Math.abs(balance);
};
```