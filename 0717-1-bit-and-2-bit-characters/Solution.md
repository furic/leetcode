# Sequential Bit Parsing | 11 Lines | O(n) | 0ms

# Intuition
The key insight is that the decoding is deterministic and greedy. Starting from the left, whenever we see a '1', it must be the start of a two-bit character. We can parse the entire array and check if we land exactly on the last bit or jump past it.

# Approach
- **Greedy Parsing Strategy**:
  - Parse the bit array from left to right following the encoding rules
  - The decoding is unambiguous - each position determines the next position uniquely
  - No backtracking or alternative interpretations needed

- **Encoding Rules**:
  - Bit '0' → one-bit character (consumes 1 bit)
  - Bit '1' → two-bit character starting (must be followed by another bit, consumes 2 bits)
  - Since '1' always starts a two-bit character, we skip the next bit immediately

- **Parsing Logic**:
  - Iterate through the array with index tracking
  - **When currentIndex == length - 1**:
    - We've reached exactly the last position
    - The last bit can only be decoded as a one-bit character (0)
    - Return true immediately
  - **When bits[currentIndex] == 1**:
    - This is the start of a two-bit character (10 or 11)
    - Skip the next bit by incrementing currentIndex
    - The loop's natural increment will move us forward again
  - **When bits[currentIndex] == 0**:
    - This is a one-bit character
    - Let the loop increment handle moving to next position

- **Exit Condition**:
  - If we reach exactly the last index inside the loop → return true
  - If we exit the loop normally → return false (jumped past last bit)
  
- **Why This Works**:
  - The parsing is deterministic - only one valid way to decode
  - If we land on the last bit, it must be a standalone '0' (one-bit character)
  - If we skip over the last bit, it was consumed as part of a two-bit character ending in '0'

- **Example Walkthrough** ([1,0,0]):
  - Index 0: bits[0] = 1 → two-bit character, skip to index 2 (currentIndex++)
  - Index 2: currentIndex == 2 == length-1 → reached last bit → return true
  - Decoding: [10][0] - last character is one-bit

- **Example Walkthrough** ([1,1,1,0]):
  - Index 0: bits[0] = 1 → skip to index 2
  - Index 2: bits[2] = 1 → skip to index 4
  - Index 4: currentIndex = 4 > length-1 = 3 → exited loop → return false
  - Decoding: [11][10] - last 0 is part of two-bit character

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array
  - Each bit visited at most once
  - Early termination when reaching last bit

- Space complexity: $$O(1)$$
  - Only one index variable used
  - No additional data structures
  - In-place processing

# Code
```typescript
const isOneBitCharacter = (bits: number[]): boolean => {
    for (let currentIndex = 0; currentIndex < bits.length; currentIndex++) {
        if (currentIndex === bits.length - 1) {
            return true;
        }

        if (bits[currentIndex] === 1) {
            currentIndex++;
        }
    }

    return false;
};
```