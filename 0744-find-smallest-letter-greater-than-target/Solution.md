# Linear Search with Wraparound | 11 Lines | O(n) | 0ms

# Intuition

Since the array is sorted, the first letter greater than target is the answer. If no such letter exists, wrap around to the first element (circular array behavior).

# Approach

**Linear Search:**
1. Scan array from left to right
2. Return first letter with char code > target
3. If loop completes without finding: return first letter

**Why Linear Search:**
- Simple and correct
- Array is sorted, so first match is smallest
- O(n) is acceptable for small inputs

**Binary Search Alternative:**
- Could use binary search for O(log n)
- But for small arrays, linear search is simpler

**Example: letters=["c","f","j"], target="c"**

Scan:
- 'c': c≤c, continue
- 'f': f>c, return 'f' ✓

**Example: letters=["x","x","y","y"], target="z"**

Scan:
- All letters ≤ 'z'
- Return first: 'x' ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through array
  - Worst case: scan all elements
  - Early exit on first match

- Space complexity: $$O(1)$$
  - Only index variable
  - No additional data structures

# Code
```typescript []
const nextGreatestLetter = (letters: string[], target: string): string => {
    const targetCharCode = target.charCodeAt(0);
    
    for (let index = 0; index < letters.length; index++) {
        const currentCharCode = letters[index].charCodeAt(0);
        
        if (currentCharCode > targetCharCode) {
            return letters[index];
        }
    }
    
    return letters[0];
};
```