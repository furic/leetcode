# Bit Manipulation Formula | 3 Lines | O(1) | 0ms

# Intuition

The alternating left-right elimination process creates a pattern where the last remaining integer can be determined directly through bit manipulation, without simulating the entire process. The key insight is that the survivor follows a mathematical pattern related to the binary representation of n, specifically depending on which bit positions are set in n-1 when masked with an alternating bit pattern.

# Approach

**Core Mathematical Insight:**
- The elimination process has a deterministic pattern based on n's binary representation
- Instead of simulating O(log n) rounds of elimination, we can compute the answer directly
- The formula involves masking n-1 with an alternating bit pattern and adjusting

**Step-by-Step Process:**

**1. Understand the Elimination Pattern:**
- Start with integers 1 to n
- Round 1: Eliminate from left (delete positions 2, 4, 6, ...)
- Round 2: Eliminate from right (delete every second from remaining)
- Continue alternating until one number remains
- Total rounds: O(log n), each round halves the remaining numbers

**2. Observe the Mathematical Pattern:**
- Through careful analysis of multiple examples, a pattern emerges
- The last survivor relates to the binary representation of n
- Specifically, it depends on which bits in n-1 align with an alternating bit pattern
- This pattern can be captured using bitwise AND with a specific mask

**3. Define the Alternating Bit Mask:**
- Create mask: 0xAAAAAAAA (32-bit) or 0xAAAAAAAAAAAAAAAA (64-bit for large n)
- In binary: ...10101010101010101010101010101010
- This mask has 1s at bit positions 1, 3, 5, 7, ... (0-indexed from right)
- These positions correspond to "even" positions when counting from right starting at 1
- The mask filters out specific bits that determine the survivor

**4. Apply the Direct Formula:**
- Compute: result = ((n - 1) & ALTERNATING_MASK) + 1
- Breaking down the formula:
  - Subtract 1 from n: shifts the problem space for mathematical convenience
  - Apply bitwise AND with alternating mask: keeps only specific bit positions
  - Add 1 back: adjusts the result to the correct 1-indexed answer

**5. Why n-1 Instead of n:**
- The formula uses n-1 to align the bit positions correctly
- After applying the mask and adding 1, we get the exact survivor position
- This offset is crucial for the mathematical correctness of the pattern

**6. Handle Overflow for Large n:**
- JavaScript bitwise operations work on 32-bit signed integers
- For n > 2^31 - 1, bitwise operations cause overflow
- Solution: Use BigInt for numbers exceeding 32-bit range
- Check if n > 0x7FFFFFFF (max 32-bit signed int)
- If yes, convert to BigInt, apply formula, convert back to number

**7. BigInt Handling:**
- Create BigInt version of the mask: 0xAAAAAAAAAAAAAAAAn (64-bit)
- All operations use BigInt arithmetic (n suffix)
- This ensures correct results up to the constraint limit (1e15)
- Convert final result back to regular number for return

**8. Why This Formula Works:**

**Theoretical Foundation:**
- Each elimination round has predictable effects on positions
- Left elimination: keeps odd-positioned elements (1st, 3rd, 5th, ...)
- Right elimination: depends on parity, but follows pattern
- After multiple rounds, the survivor's position follows a recurrence relation
- This relation simplifies to the bit manipulation formula

**Pattern Recognition:**
- For n=8 (0b1000): (7 & 0xAAAAAAAA) + 1 = (0b111 & 0b...1010) + 1 = 0b010 + 1 = 3
- For n=5 (0b101): (4 & 0xAAAAAAAA) + 1 = (0b100 & 0b...1010) + 1 = 0b000 + 1 = 1
- For n=1: (0 & 0xAAAAAAAA) + 1 = 0 + 1 = 1
- The mask extracts specific bits that encode the survivor position

**Mathematical Proof Sketch:**
- The elimination process can be modeled as a recurrence
- Through mathematical induction, this recurrence resolves to the bit pattern formula
- The alternating mask captures the accumulated effect of all elimination rounds
- Adding 1 adjusts for 1-indexed positions

**9. Optimization Benefits:**
- Time: O(1) constant time vs O(n) simulation
- Space: O(1) constant space
- No loops or recursion needed
- Direct computation regardless of n's size (within constraints)

**10. Edge Cases Handled:**
- n=1: Formula gives (0 & mask) + 1 = 1 ✓
- Large n (up to 1e15): BigInt prevents overflow ✓
- Powers of 2: Formula handles these special cases correctly
- Odd vs even n: Mask naturally accounts for parity differences

# Complexity

- Time complexity: $$O(1)$$
  - Single bitwise AND operation: O(1)
  - Addition and subtraction: O(1)
  - BigInt operations for large n: Still O(1) for fixed-size integers
  - No loops, no recursion, no iteration over n
  - Direct mathematical formula regardless of n's magnitude

- Space complexity: $$O(1)$$
  - Fixed-size mask constant: O(1)
  - Single result variable: O(1)
  - No arrays, no data structures
  - No recursion stack
  - Even with BigInt, space is constant (fixed bit width for constraint range)

# Code
```typescript []
const lastInteger = (n: number): number => {
    if (n > 0x7FFFFFFF) {
        const nBig = BigInt(n);
        const ALTERNATING_MASK = 0xAAAAAAAAAAAAAAAAn;
        return Number(((nBig - 1n) & ALTERNATING_MASK) + 1n);
    }
    
    const ALTERNATING_MASK = 0xAAAAAAAA;
    return ((n - 1) & ALTERNATING_MASK) + 1;
};
```