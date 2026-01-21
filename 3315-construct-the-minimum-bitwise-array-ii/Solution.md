# Rightmost Zero-Bit Subtraction | 13 Lines | O(n) | 0ms

# Rightmost Zero-Bit Subtraction | 13 Lines | O(n) |

## Intuition

The key insight is that for any valid `x` where `x OR (x+1) = prime`, the relationship depends on which bits change between `x` and `x+1`. When incrementing a number, bits flip in a cascading pattern from the rightmost position until a 0-bit is encountered. The first 0-bit position in the prime's binary representation is the critical marker. By subtracting the value of this first 0-bit from the prime, we get the minimum `x` that satisfies the condition. For the even prime 2 (binary `10`), the first 0-bit is at position 0, leaving us with `answer = -1` (the loop never executes).

## Approach

**1. Iterate Through Each Prime in the Array**
   - Process each prime independently to find its corresponding minimum answer
   - Modify the array in-place for space efficiency

**2. Initialize Tracking Variables**
   - Set `answer = -1` as the default (handles the case where no valid answer exists, like prime = 2)
   - Start `bitValue = 1` to represent the least significant bit position (2^0)

**3. Scan for the First 0-Bit from Right to Left**
   - Loop while `(prime & bitValue) !== 0`, meaning the current bit position is set to 1 in the prime
   - This condition continues scanning rightward through consecutive 1-bits
   - Inside the loop: set `answer = prime - bitValue` (we'll update this as we scan)
   - Left-shift `bitValue` by 1 to check the next higher bit position

**4. Understand the Exit Condition**
   - The loop terminates when `(prime & bitValue) === 0`, indicating we've found a 0-bit in the prime
   - At this point, `bitValue` represents the first 0-bit's value in the prime's binary representation
   - The last assignment of `answer` before exiting contains `prime` minus the previous bit value (the rightmost 1-bit before the first 0-bit)

**5. Mathematical Foundation**
   - For `x OR (x+1) = prime` to hold, `x` must be positioned such that consecutive increments fill in exactly the bits of `prime`
   - The first 0-bit in `prime` divides the binary representation: all bits to the right are 1, and the bit at that position is 0
   - Subtracting the value of the rightmost 1-bit (just before the first 0-bit) from `prime` gives us `x`
   - When we add 1 to this `x`, the carry propagates through its 1-bits, setting the first 0-bit to 1, and ORing with the original `x` reconstructs `prime` perfectly

**6. Examples to Verify**
   - Prime = 5 (binary `101`): First 0-bit at position 1 (value 2). Loop iteration: answer = 5 - 1 = 4. Result: `4 OR 5 = 5` ✓
   - Prime = 7 (binary `111`): First 0-bit at position 3 (value 8). Loop iterations: answer = 7 - 4 = 3 (after scanning all 1-bits). Result: `3 OR 4 = 7` ✓
   - Prime = 2 (binary `10`): First 0-bit at position 0 (value 1). Loop never executes. Result: `answer = -1` ✓

**7. Return the Modified Array**
   - The input array is modified in-place with the answers
   - Time and space optimized by reusing the input array

## Complexity

- **Time Complexity: O(n·log P)**
  - Outer loop: O(n) for each element in the array
  - Inner while loop: O(log P) where P is the maximum prime value, since we scan through bit positions
  - For practical constraints with bounded primes, this is effectively O(n)

- **Space Complexity: O(1)**
  - Modifications are done in-place
  - Only a constant number of variables (prime, answer, bitValue)
  - Output array doesn't count as auxiliary space

## Code
```typescript
const minBitwiseArray = (nums: number[]): number[] => {
    for (let i = 0; i < nums.length; i++) {
        const prime = nums[i];
        let answer = -1;
        let bitValue = 1;
        
        while ((prime & bitValue) !== 0) {
            answer = prime - bitValue;
            bitValue <<= 1;
        }
        
        nums[i] = answer;
    }
    return nums;
};
```