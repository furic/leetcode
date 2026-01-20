# Bit Manipulation Inverse with OR Property | 13 Lines | O(n) | 0ms

# Bit Manipulation Inverse with OR Property | 13 Lines | O(n) |

## Intuition

The core insight is understanding what happens when we OR two consecutive numbers. When we compute `x OR (x+1)`, we're merging the bit patterns of a number and its successor. The key observation is that `x` and `x+1` differ precisely at the lowest set bit position of `x+1`, creating a predictable bit pattern.

For an odd prime `p`, if a valid `x` exists such that `x OR (x+1) = p`, we can work backwards from `p` to find the minimum `x`. The lowest set bit of `(p+1)` acts as a marker—subtracting half this value from `p` gives us the minimum valid answer. For even primes (only 2), no valid answer exists since `x OR (x+1)` is always odd.

## Approach

**1. Handle the Special Case of 2**
   - The only even prime is 2
   - For any non-negative integer `x`, `x OR (x+1)` is always odd (at least one of them is odd, so their OR includes a 1 in the least significant position, or higher)
   - Therefore, no value of `x` can satisfy `x OR (x+1) = 2`
   - Return `-1` for this case

**2. Find the Lowest Set Bit of (prime + 1)**
   - Use the bit trick: `lowestBit = (prime + 1) & (-(prime + 1))`
   - This isolates the rightmost 1 bit in the binary representation of `(prime + 1)`
   - For example: if `prime = 5`, then `prime + 1 = 6 = 110₂`, so `lowestBit = 010₂ = 2`
   - This bit represents the position where the carry propagation stops when incrementing `prime`

**3. Calculate the Minimum Answer**
   - The minimum `x` that satisfies the condition is: `answer = prime - (lowestBit >> 1)`
   - Why? The structure of consecutive numbers and their OR operation creates a dependency on this bit position
   - By subtracting half the lowest bit, we position `x` such that its trailing bits and the carry-induced bits in `x+1` combine via OR to equal `prime`
   - For example: `prime = 5`, `lowestBit = 2`, `answer = 5 - 1 = 4`
   - Verification: `4 OR 5 = 100₂ OR 101₂ = 101₂ = 5` ✓

**4. Mathematical Insight Behind the Algorithm**
   - When `prime + 1` has its lowest set bit at position `k`, it means `prime = 2^k + 2^(k+1) + ... + 2^(m)` (all 1s from position 0 to k-1, then a 1 at position k)
   - The minimum valid `x` is positioned such that it has 0 at position `k-1` and 1s below, with 1s at all higher positions that `prime` requires
   - This ensures `x+1` flips the bits in the right positions to complete the OR to equal `prime`

**5. Return the Result Array**
   - Build the result array by applying the above logic to each element
   - Time complexity is O(n) since each element is processed in constant time

## Complexity

- **Time Complexity: O(n)**
  - Single pass through the input array
  - Each element processed with constant-time bit operations: AND, right shift, subtraction

- **Space Complexity: O(1) auxiliary**
  - Output array doesn't count toward auxiliary space
  - Only a constant number of variables used regardless of input size

## Code
```typescript
const minBitwiseArray = (nums: number[]): number[] => {
    const result: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        const prime = nums[i];
        
        if (prime === 2) {
            result[i] = -1;
        } else {
            const lowestBit = (prime + 1) & (-(prime + 1));
            result[i] = prime - (lowestBit >> 1);
        }
    }
    
    return result;
};
```