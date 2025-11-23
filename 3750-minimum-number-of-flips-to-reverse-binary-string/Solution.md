# Palindrome Mismatch Count | 8 Lines | O(d) | 0ms

# Intuition
To make a binary string equal to its reverse, we need to make it a palindrome. By comparing each position with its mirror position, we can count how many positions don't match their mirror. Each mismatch requires exactly one flip.

# Approach
- **Convert to Binary String**:
  - Convert the number to its binary representation using `toString(2)`
  - JavaScript's toString(2) automatically excludes leading zeros
  - Store the length for efficient indexing

- **Mirror Position Comparison**:
  - For each position i in the string, compare it with its mirror position (len-1-i)
  - Position i mirrors position len-1-i in a palindrome
  - Example: In "1010" (length 4):
    - Position 0 mirrors position 3
    - Position 1 mirrors position 2
    - Position 2 mirrors position 1
    - Position 3 mirrors position 0

- **Count Mismatches**:
  - When bits[i] ≠ bits[len-1-i], they need to be made equal
  - Each mismatch requires one flip to fix
  - We count ALL positions that don't match their mirror
  
- **Why Count All Positions**:
  - To transform "1010" into "0101", we need to flip every single bit
  - Position 0: '1'→'0', Position 1: '0'→'1', Position 2: '1'→'0', Position 3: '0'→'1'
  - Total: 4 flips needed, which equals counting all 4 mismatched positions
  - Note: We count both positions in each mirror pair because both need flipping

- **Example Walkthrough** (n=10, binary="1010"):
  - Target is reverse: "0101"
  - Compare each position with mirror:
    - i=0: '1' vs '0' (pos 3) → mismatch, count=1
    - i=1: '0' vs '1' (pos 2) → mismatch, count=2
    - i=2: '1' vs '0' (pos 1) → mismatch, count=3
    - i=3: '0' vs '1' (pos 0) → mismatch, count=4
  - Result: 4 flips needed

- **Palindrome Property**:
  - A palindrome has bits[i] == bits[len-1-i] for all i
  - If already a palindrome (like "111"), count=0
  - If no positions match mirrors (like "1010"), all positions need flipping

# Complexity
- Time complexity: $$O(d)$$
  - Converting number to binary string: O(d) where d = number of bits = log₂(n)
  - Single pass through all bit positions: O(d)
  - Total: O(d) = O(log n)

- Space complexity: $$O(d)$$
  - Binary string storage: O(d) where d = number of bits
  - Counter variable: O(1)
  - Total: O(d) = O(log n)

# Code
```typescript
const minimumFlips = (n: number): number => {
    const bits = n.toString(2);
    const len = bits.length;
    let count = 0;
    
    for (let i = 0; i < len; i++) {
        if (bits[i] !== bits[len - 1 - i]) {
            count++;
        }
    }
    
    return count;
};
```