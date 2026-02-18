# Bit Manipulation with Two Checks | 6 Lines | O(1) | 0ms

# Intuition

Alternating bits means adjacent bits differ. Use bit shifts to check: (1) no adjacent 1s exist, (2) bits at distance 2 are consistent (pattern repeats).

# Approach

**Two Bit Checks:**

1. **No Adjacent Ones**: `n & (n >> 1) == 0`
   - Shift right by 1, AND with original
   - If any adjacent bits both 1, result ≠ 0
   - Example: 5=101, 101 & 010 = 000 ✓

2. **Pattern Consistent**: `n & (n >> 2) == (n >> 2)`
   - Shift right by 2, check if bits match original pattern
   - Ensures alternating pattern continues
   - Example: 5=101, 101 & 001 = 001 = (n >> 2) ✓

**Why Both Checks:**
- Check 1 alone: fails for patterns like 100100 (no adjacent 1s but not alternating)
- Check 2 alone: fails for some patterns
- Together: ensures true alternating

**Example: n=5 (binary 101)**

Check 1: 101 & 010 = 000 ✓
Check 2: 101 & 001 = 001 = 001 ✓

Result: true ✓

**Example: n=7 (binary 111)**

Check 1: 111 & 011 = 011 ≠ 0 ✗

Result: false ✓

# Complexity

- Time complexity: $$O(1)$$
  - Constant number of bit operations
  - Independent of bit count

- Space complexity: $$O(1)$$
  - Only boolean variables
  - No additional data structures

# Code
```typescript []
const hasAlternatingBits = (n: number): boolean => {
    const noAdjacentOnes = (n & (n >> 1)) === 0;
    const patternConsistent = (n & (n >> 2)) === (n >> 2);
    
    return noAdjacentOnes && patternConsistent;
};
```