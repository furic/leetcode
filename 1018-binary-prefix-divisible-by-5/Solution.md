# Modular Arithmetic | 6 Lines | O(n) | 1ms

# Intuition
Instead of building potentially huge binary numbers (which would overflow), we only need to track whether each prefix is divisible by 5. Using modular arithmetic, we can maintain just the remainder mod 5 as we process each bit, avoiding overflow entirely.

# Approach
- **Core Insight - Avoid Overflow**:
  - Building actual binary numbers from array could create massive values (2^100000+)
  - We only care about divisibility by 5, not the actual number
  - Track only the remainder mod 5 instead of the full value
  - Remainders are always 0-4, preventing overflow

- **Modular Arithmetic Property**:
  - Key formula: `(a * b + c) mod m = ((a mod m) * b + c) mod m`
  - Applied here: When adding bit, we shift left (×2) and add new bit
  - `newNumber = oldNumber * 2 + newBit`
  - `newRemainder = (oldRemainder * 2 + newBit) % 5`
  - This property allows us to work with remainders throughout

- **Binary Number Construction**:
  - Each new bit extends the binary number
  - Adding bit at position i: multiply current value by 2 (left shift) and add bit
  - Example: Building 101₂
    - Start: 0
    - Add 1: 0×2+1 = 1 (binary: 1)
    - Add 0: 1×2+0 = 2 (binary: 10)
    - Add 1: 2×2+1 = 5 (binary: 101)

- **Step-by-Step Process**:
  - Initialize remainder as 0 (empty prefix has value 0)
  - For each bit in the array:
    - Update remainder: `(remainder * 2 + bit) % 5`
    - Check if remainder is 0 (divisible by 5)
    - Store boolean result in output array

- **Why This Works**:
  - At position i, remainderMod5 represents (value of nums[0..i]) % 5
  - If remainder is 0, the number is divisible by 5
  - We never need the actual number, just its remainder

- **Example Walkthrough** ([0,1,1]):
  - i=0: remainder = (0×2+0)%5 = 0 → divisible → true
  - i=1: remainder = (0×2+1)%5 = 1 → not divisible → false
  - i=2: remainder = (1×2+1)%5 = 3 → not divisible → false
  - Result: [true, false, false]

- **Example Walkthrough** ([1,0,1,0,1]):
  - i=0: 1₂ = 1, remainder = 1%5 = 1 → false
  - i=1: 10₂ = 2, remainder = (1×2+0)%5 = 2 → false
  - i=2: 101₂ = 5, remainder = (2×2+1)%5 = 0 → true
  - i=3: 1010₂ = 10, remainder = (0×2+0)%5 = 0 → true
  - i=4: 10101₂ = 21, remainder = (0×2+1)%5 = 1 → false

- **Edge Cases Handled**:
  - Single element [0]: value 0 is divisible by 5
  - All zeros: each prefix value is 0, all divisible
  - Large arrays: no overflow since we only track remainder (0-4)

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array
  - Each iteration performs constant-time arithmetic operations
  - No nested loops or recursion

- Space complexity: $$O(n)$$
  - Result array of size n
  - Only one integer variable for remainder: O(1)
  - Total: O(n) for output storage

# Code
```typescript
const prefixesDivBy5 = (nums: number[]): boolean[] => {
    let remainderMod5 = 0;
    const result: boolean[] = Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        remainderMod5 = (remainderMod5 * 2 + nums[i]) % 5;
        result[i] = remainderMod5 === 0;
    }

    return result;
};
```