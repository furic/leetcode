# Array Map Reversal | 1 Line | O(n) | 1ms

# Intuition

We need to reverse the first k characters while keeping the rest unchanged. By mapping each character to either its reversed position (if within first k) or its original position, we can achieve this in a single pass.

# Approach

**Mapping Strategy:**
- For indices 0 to k-1: Map to reversed position `s[k - i - 1]`
- For indices k onwards: Keep original character `s[i]`

**Reverse Position Formula:**
- At index i (where i < k), the reversed position is `k - i - 1`
- Example: k=3, i=0 → position 2, i=1 → position 1, i=2 → position 0

**Example: s="abcd", k=2**
- i=0: i<2, use s[2-0-1]=s[1]='b'
- i=1: i<2, use s[2-1-1]=s[0]='a'
- i=2: i≥2, use s[2]='c'
- i=3: i≥2, use s[3]='d'
- Result: "bacd" ✓

# Complexity

- Time complexity: $$O(n)$$
  - split: O(n) to create array
  - map: O(n) single pass
  - join: O(n) to create string
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Array from split: O(n)
  - Result string: O(n)

# Code
```typescript []
const reversePrefix = (s: string, k: number): string =>
    s.split("").map((c, i) => (i < k ? s[k - i - 1] : c)).join("");
```