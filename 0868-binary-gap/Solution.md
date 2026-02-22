# Track Last One Position | 18 Lines | O(log n) | 0ms

# Intuition

Convert to binary string, track position of last seen '1'. When finding next '1', calculate distance and update maximum. Return max distance found.

# Approach

**Single Pass with Position Tracking:**

1. Convert number to binary string
2. Iterate through each character
3. When finding '1':
   - If previous '1' exists: calculate distance
   - Update last '1' position
4. Track maximum distance

**Why This Works:**
- Distance = current index - last index
- Only care about adjacent pairs
- Single pass finds all pairs

**Example: n=22 (binary "10110")**

Process:
- i=0: '1' → lastOneIndex=0
- i=1: '0' → skip
- i=2: '1' → distance=2-0=2, max=2, lastOneIndex=2
- i=3: '1' → distance=3-2=1, max=2, lastOneIndex=3
- i=4: '0' → skip

Result: 2 ✓

# Complexity

- Time complexity: $$O(\log n)$$
  - Binary string length = O(log n)
  - Single pass through string
  - Constant work per character
  - Overall: O(log n)

- Space complexity: $$O(\log n)$$
  - Binary string: O(log n)
  - Counter variables: O(1)
  - Overall: O(log n)

# Code
```typescript []
const binaryGap = (n: number): number => {
    const binaryString = n.toString(2);
    let lastOneIndex = -1;
    let maxGap = 0;

    for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
            if (lastOneIndex !== -1) {
                const distance = i - lastOneIndex;
                maxGap = Math.max(maxGap, distance);
            }

            lastOneIndex = i;
        }
    }

    return maxGap;
};
```