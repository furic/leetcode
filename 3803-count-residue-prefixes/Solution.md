# Set Tracking with Reduce | 6 Lines | O(n) | 0ms

# Intuition

A prefix is a residue if its distinct character count equals its length mod 3. Track distinct characters in a set while scanning left-to-right, checking the condition at each position.

# Approach

**Single Pass Strategy:**
- Use Set to track distinct characters seen so far
- For each character at index i:
  - Add character to set
  - Check if set.size == (i+1) % 3
  - Increment count if condition holds

**Using Reduce:**
- Accumulate count while processing each character
- Set maintained outside reduce for state persistence
- Concise functional approach

**Example: s="abc"**

- i=0: 'a', set={'a'}, size=1, (0+1)%3=1 → 1==1 ✓ count=1
- i=1: 'b', set={'a','b'}, size=2, (1+1)%3=2 → 2==2 ✓ count=2
- i=2: 'c', set={'a','b','c'}, size=3, (2+1)%3=0 → 3≠0 count=2

Result: 2 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through string
  - Set operations: O(1) average
  - Overall: O(n)

- Space complexity: $$O(min(n, 26))$$
  - Set stores at most 26 distinct characters
  - Effectively: O(1) for lowercase letters

# Code
```typescript []
const residuePrefixes = (s: string): number => {
    const set = new Set<string>();
    return s.split("").reduce((arr, c, i) => {
        set.add(c);
        return set.size === (i + 1) % 3 ? arr + 1 : arr;
    }, 0);
};
```