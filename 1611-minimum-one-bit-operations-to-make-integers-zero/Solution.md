# Gray Code Bit Manipulation | 23 Lines | O(log n) | 0ms

# Intuition
This problem is deeply connected to Gray code - a binary numbering system where consecutive values differ by exactly one bit. The operations allowed mirror Gray code transitions. The minimum operations to transform n to 0 follows a pattern based on the positions of set bits, with alternating addition/subtraction based on Gray code properties.

# Approach
**Gray Code Pattern Recognition:**
- Process bits from highest to lowest (most significant to least)
- For each set bit at position k, it takes 2^(k+1) - 1 operations to clear it
- Alternate between adding and subtracting these operation counts (Gray code property)
- This mirrors the inverse Gray code transformation

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - `operationCount = 0` - accumulator for total operations
   - `shouldAdd = true` - alternates between add/subtract
   - `remainingNumber = n` - bits still to process

2. **Process Each Set Bit:**
   - While `remainingNumber > 0`:
   
   **Find highest set bit:**
   - `highestBitPosition = floor(log2(remainingNumber))`
   - `highestBitValue = 2^highestBitPosition`
   - This identifies the most significant bit

3. **Calculate Operations for This Bit:**
   - Formula: `operations = 2^(k+1) - 1` where k is bit position
   - Equivalently: `2 × highestBitValue - 1`
   - This represents operations needed to transform a number with single bit k to 0

4. **Apply Gray Code Alternation:**
   - If `shouldAdd`: add operations to count
   - Otherwise: subtract operations from count
   - This alternation is key to Gray code inverse transformation

5. **Update State:**
   - Remove processed bit: `remainingNumber -= highestBitValue`
   - Toggle operation: `shouldAdd = !shouldAdd`
   - Continue with remaining bits

6. **Return Total Operations:**
   - Final count gives minimum operations needed

**Why This Works:**

**Gray Code Connection:**
- Gray code: adjacent values differ by 1 bit
- Binary to Gray: `G(n) = n XOR (n >> 1)`
- Gray to Binary (inverse): computed by this alternating sum
- Our operations mirror Gray code transitions

**Operation Formula Derivation:**
- To clear bit at position k (with all lower bits 0):
  - Must go through all Gray code values from 2^k to 0
  - Count = 2^(k+1) - 1
- Example: bit 2 (value 4) → needs 2^3 - 1 = 7 operations

**Alternating Sum:**
- Multiple set bits require cancellation effects
- Alternation captures interference between bits
- Mirrors mathematical structure of Gray code inverse

**Example Walkthrough (n = 6 = 110₂):**

**Iteration 1:**
- remainingNumber = 6 (110₂)
- highestBitPosition = 2, highestBitValue = 4
- operations = 2×4 - 1 = 7
- shouldAdd = true → operationCount = 0 + 7 = 7
- Remove bit: 6 - 4 = 2 (010₂)
- Toggle: shouldAdd = false

**Iteration 2:**
- remainingNumber = 2 (010₂)
- highestBitPosition = 1, highestBitValue = 2
- operations = 2×2 - 1 = 3
- shouldAdd = false → operationCount = 7 - 3 = 4
- Remove bit: 2 - 2 = 0
- Toggle: shouldAdd = true

**Result:** 4 ✓

**Verification of n=6 → 0:**
```
110 → 010 (flip bit 2, requires bit 1 set and bit 0 clear) ✓
010 → 011 (flip bit 0)
011 → 001 (flip bit 1, requires bit 0 set)
001 → 000 (flip bit 0)
Total: 4 operations ✓
```

**Example 2 (n = 3 = 11₂):**

**Iteration 1:**
- remainingNumber = 3 (11₂)
- highestBit = 1, value = 2
- operations = 3
- shouldAdd = true → count = 3
- Remove: 3 - 2 = 1

**Iteration 2:**
- remainingNumber = 1 (1₂)
- highestBit = 0, value = 1
- operations = 1
- shouldAdd = false → count = 3 - 1 = 2

**Result:** 2 ✓

**Key Insights:**

**Why Alternation:**
- First bit: contributes positively
- Second bit: interferes, contributes negatively
- Pattern continues for all bits
- Captures complex interaction between bits

**Mathematical Foundation:**
- This computes inverse Gray code: `B(G) = G XOR (G>>1) XOR (G>>2) XOR ...`
- Equivalently computed by alternating sum of bit contributions
- Our algorithm implements this efficiently

**Operation Complexity:**
- Each bit position processed once
- O(log n) iterations (number of bits)
- O(1) per iteration

**Edge Cases:**

**n = 0:**
- No bits set
- Result: 0 operations

**Powers of 2:**
- Single bit set at position k
- Result: 2^(k+1) - 1
- Example: n=8 (1000₂) → 15 operations

**All bits set:**
- n = 2^k - 1 (all 1's)
- Alternating sum with all terms
- Example: n=7 (111₂) → complex interaction

**Small values:**
- n=1: 1 operation
- n=2: 3 operations
- n=3: 2 operations
- Pattern not immediately obvious without Gray code insight

**Why Not Dynamic Programming:**
- Could build DP table for all values up to n
- O(n log n) time, O(n) space
- Our approach: O(log n) time, O(1) space
- Mathematical insight eliminates need for state exploration

**Alternative Formulation:**
```typescript
// Equivalent using XOR (inverse Gray code)
let result = n;
while (n > 0) {
    n >>= 1;
    result ^= n;
}
return result;
```
- Same result, different presentation
- Our version more explicit about alternating sum

# Complexity
- Time complexity: $$O(\log n)$$ - process each bit once, at most log₂(n) bits
- Space complexity: $$O(1)$$ - only using a few variables

# Code
```typescript
const minimumOneBitOperations = (n: number): number => {
    let operationCount = 0;
    let shouldAdd = true;
    let remainingNumber = n;

    while (remainingNumber > 0) {
        const highestBitPosition = Math.floor(Math.log2(remainingNumber));
        const highestBitValue = 2 ** highestBitPosition;
        
        const operationsForThisBit = highestBitValue * 2 - 1;
        
        if (shouldAdd) {
            operationCount += operationsForThisBit;
        } else {
            operationCount -= operationsForThisBit;
        }
        
        remainingNumber -= highestBitValue;
        shouldAdd = !shouldAdd;
    }

    return operationCount;
};
```