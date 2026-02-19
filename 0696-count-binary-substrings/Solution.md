# Group Count with Adjacent Pairing | 17 Lines | O(n) | 6ms

# Intuition

Valid substrings have consecutive 0s followed by consecutive 1s (or vice versa). Track consecutive character groups. Between adjacent groups of sizes m and n, we can form min(m,n) valid substrings.

# Approach

**Group-Based Counting:**

1. Track consecutive character groups
2. When transitioning between groups:
   - Count valid substrings: min(prevSize, currSize)
   - Valid substrings use matching prefix/suffix from both groups
3. Process final transition after loop

**Why min(m,n):**
- Group "00" (m=2) + Group "111" (n=3)
- Valid: "01" (1+1), "0011" (2+2)
- Can't use "00111" (would need m=3, but m=2)
- Total: min(2,3) = 2 ✓

**Example: s="00110011"**

Groups: [2 zeros, 2 ones, 2 zeros, 2 ones]

Transitions:
- "00"→"11": min(2,2)=2 substrings
- "11"→"00": min(2,2)=2 substrings  
- "00"→"11": min(2,2)=2 substrings

Total: 6 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through string
  - Constant work per character
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only counter variables
  - No additional data structures

# Code
```typescript []