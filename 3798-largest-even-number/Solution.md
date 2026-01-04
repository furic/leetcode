# Greedy Rightmost Even | 6 Lines | O(n) | 0ms

# Intuition

To maximize the even number, keep as many leftmost digits as possible while ensuring the number ends in an even digit ('2'). Since we want the largest number, we should find the rightmost '2' and include everything before it.

# Approach

**Greedy Strategy:**
- Scan from right to left to find the rightmost '2'
- Include all digits from start up to and including this '2'
- This maximizes the number (more digits = larger) while ensuring it's even

**Why Rightmost '2':**
- Keeping more digits makes the number larger
- We need the last digit to be even (must be '2')
- Rightmost '2' gives us the longest valid string

**Example: s="1112"**
- Scan right to left: '2' found at index 3
- Return s[0..3] = "1112" ✓

**Example: s="221"**
- '2' found at index 1 (rightmost '2')
- Return s[0..1] = "22" ✓

**Example: s="1"**
- No '2' found
- Return "" ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass from right to left
  - Slice operation: O(n) worst case

- Space complexity: $$O(n)$$
  - Result string: O(n) for the slice
  - No additional data structures

# Code
```typescript []
const largestEven = (s: string): string => {
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '2') {
            return s.slice(0, i + 1);
        }
    }
    return "";
};
```