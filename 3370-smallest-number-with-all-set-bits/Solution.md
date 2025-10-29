# Bit Length Calculation | 1 Line | O(log n) | 0ms

# Intuition
A number with only set bits (all 1's in binary) has the form 2^k - 1 (like 1, 3, 7, 15, 31...). To find the smallest such number ≥ n, we need to determine how many bits n requires, then create a number with that many 1-bits.

# Approach
**Binary Length to All-Ones Conversion:**
- Find the number of bits in n's binary representation
- Create a number with all bits set to 1 for that length
- This gives the smallest "all set bits" number ≥ n

**Step-by-Step Process:**

1. **Get Bit Length:**
   - Convert n to binary string: `n.toString(2)`
   - Count characters: `.length` gives number of bits
   - Example: 5 → "101" → length 3

2. **Create All-Ones Number:**
   - Number with k bits all set to 1 = 2^k - 1
   - Use bit shift: `1 << k` computes 2^k
   - Subtract 1 to get all bits set
   - Example: k=3 → (1 << 3) - 1 = 8 - 1 = 7 = "111"

3. **Return Result:**
   - This number is guaranteed to be ≥ n
   - It's the smallest such number with all set bits

**Why This Works:**

**Mathematical Foundation:**
- Numbers with all bits set: 2^k - 1 for k = 1, 2, 3, ...
- Binary representations: 1, 11, 111, 1111, ...
- Decimal values: 1, 3, 7, 15, 31, 63, ...

**Smallest ≥ n Guarantee:**
- If n has k bits, largest k-bit number is 2^k - 1 (all 1's)
- This number is ≥ n by definition
- Any smaller all-1's number would have < k bits, thus < n

**Example Walkthrough (n = 5):**

- Binary of 5: "101" (3 bits)
- Need 3-bit all-ones: "111"
- Calculate: (1 << 3) - 1 = 8 - 1 = 7
- Binary of 7: "111" ✓
- Verify: 7 ≥ 5 ✓

**Example 2 (n = 10):**

- Binary of 10: "1010" (4 bits)
- Need 4-bit all-ones: "1111"
- Calculate: (1 << 4) - 1 = 16 - 1 = 15
- Binary of 15: "1111" ✓
- Verify: 15 ≥ 10 ✓

**Example 3 (n = 3):**

- Binary of 3: "11" (2 bits)
- Need 2-bit all-ones: "11"
- Calculate: (1 << 2) - 1 = 4 - 1 = 3
- Binary of 3: "11" ✓
- Verify: 3 ≥ 3 ✓ (n is already all set bits!)

**Special Cases:**

**n is already all set bits:**
- Example: n = 7 ("111")
- Result: 7 (same number)
- Correct! Already satisfies condition

**Powers of 2:**
- Example: n = 8 ("1000", 4 bits)
- Result: (1 << 4) - 1 = 15 ("1111")
- Must go to next all-ones number

**Single bit:**
- n = 1: "1" → result = 1
- n = 2: "10" (2 bits) → result = 3 ("11")

**Alternative Approaches:**

**Iterative Check:**
```typescript
const smallestNumber = (n: number): number => {
    while (true) {
        if (isAllSetBits(n)) return n;
        n++;
    }
};
```
- Less efficient: O(n) worst case
- Our approach: O(log n)

**Bit Manipulation Loop:**
```typescript
const smallestNumber = (n: number): number => {
    let result = 1;
    while (result < n) {
        result = (result << 1) | 1;
    }
    return result;
};
```
- Equivalent logic, more explicit
- Same complexity

**Why Concise Solution:**
- Leverages mathematical property directly
- Single computation vs iteration
- Clear intent in one line

**Bit Operations Explained:**

**Left Shift (<<):**
- `1 << k` = 2^k
- Moves bit left k positions
- Example: 1 << 3 = 1000₂ = 8

**Subtraction by 1:**
- 2^k - 1 flips all trailing bits to 1
- Example: 1000₂ - 1 = 0111₂
- Creates the all-ones number we need

# Complexity
- Time complexity: $$O(\log n)$$ for converting to binary string
- Space complexity: $$O(\log n)$$ for binary string representation

# Code
```typescript
const smallestNumber = (n: number): number => (1 << n.toString(2).length) - 1;
```