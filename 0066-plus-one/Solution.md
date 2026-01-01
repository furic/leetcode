# Carry Propagation | 10 Lines | O(n) | 0ms

# Intuition

Adding 1 to a number is straightforward: increment the last digit. If it's less than 9, we're done. If it's 9, it becomes 0 and we carry 1 to the next position. This process continues until we find a digit less than 9 or exhaust all digits (meaning all were 9s, requiring a new leading 1).

# Approach

**Iterate Right to Left:**
- Start from the least significant digit (rightmost)
- For each digit, check if it's less than 9
- If yes: increment it and return (no carry needed)
- If it's 9: set it to 0 and continue left (carry propagates)

**Handle All 9s Case:**
- If loop completes without returning, all digits were 9
- Example: [9,9,9] becomes [0,0,0] after loop
- Add leading 1: [1,0,0,0] to represent the overflow

**Examples:**

[1,2,3] → Increment last digit: [1,2,4] ✓

[4,3,2,9] → Last is 9, set to 0: [4,3,2,0]
         → Second-to-last is 2, increment: [4,3,3,0] ✓

[9,9,9] → All 9s, set all to 0: [0,0,0]
        → Add leading 1: [1,0,0,0] ✓

# Complexity

- Time complexity: $$O(n)$$
  - Worst case: iterate through all n digits (when all are 9s)
  - Best case: O(1) when last digit < 9
  - Average: O(1) since most numbers don't end in 9

- Space complexity: $$O(1)$$
  - Modifies input array in-place
  - unshift adds one element only when all digits are 9s
  - No additional data structures

# Code
```typescript []
const plusOne = (digits: number[]): number[] => {
    for (let digitIndex = digits.length - 1; digitIndex >= 0; digitIndex--) {
        if (digits[digitIndex] < 9) {
            digits[digitIndex]++;
            return digits;
        }
        
        digits[digitIndex] = 0;
    }
    
    digits.unshift(1);
    return digits;
};
```