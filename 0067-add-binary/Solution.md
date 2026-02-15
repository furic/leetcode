# Digit-by-Digit Addition with Carry | 16 Lines | O(max(m,n)) | 0m

# Intuition

Add binary strings like manual addition: process digits right-to-left, tracking carry. Each position: add two digits plus carry, output bit is sum%2, new carry is sum÷2.

# Approach

**Right-to-Left Addition:**
1. Start from rightmost digits
2. For each position:
   - Add digit from a (if exists) + digit from b (if exists) + carry
   - Current bit = sum % 2
   - New carry = sum ÷ 2
3. Continue until all digits and final carry processed

**Binary Addition Rules:**
- 0+0+0=0, carry=0
- 0+1+0=1, carry=0
- 1+1+0=0, carry=1
- 1+1+1=1, carry=1

**Example: a="11", b="1"**

Process:
- Pos 0: 1+1+0=2 → bit=0, carry=1
- Pos 1: 1+0+1=2 → bit=0, carry=1
- Pos 2: 0+0+1=1 → bit=1, carry=0

Result: "100" ✓

# Complexity

- Time complexity: $$O(\max(m,n))$$
  - m = length of a, n = length of b
  - Process max(m,n)+1 positions
  - Constant work per position
  - Overall: O(max(m,n))

- Space complexity: $$O(\max(m,n))$$
  - Result string: O(max(m,n))
  - Only scalar variables otherwise
  - Overall: O(max(m,n))

# Code
```typescript []
const addBinary = (a: string, b: string): string => {
    let indexA = a.length - 1;
    let indexB = b.length - 1;
    let carry = 0;
    let result = '';

    while (indexA >= 0 || indexB >= 0 || carry) {
        let digitSum = carry;

        if (indexA >= 0) digitSum += +a[indexA--];
        if (indexB >= 0) digitSum += +b[indexB--];

        result = (digitSum % 2) + result;
        carry = Math.floor(digitSum / 2);
    }

    return result;
};
```