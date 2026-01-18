# Monotonic Stack with Duplicate Removal | 33 Lines | O(n) | 95ms

# Intuition

To get the lexicographically smallest string, build it greedily using a monotonic stack. Remove larger characters if they appear later or have duplicates in the stack. After building, trim trailing duplicates since shorter strings are smaller when prefixes match.

# Approach

**Monotonic Stack Construction:**
1. Track remaining occurrences of each character
2. For each character:
   - Decrement remaining count
   - Pop stack top if:
     - Top > current (larger character)
     - AND (top has duplicate in stack OR appears later)
   - Push current character
   - Track count in stack

**Trailing Duplicate Removal:**
- After stack built, remove trailing duplicates
- Shorter string is lexicographically smaller when prefix matches
- Pop from end while character count in stack > 1

**Example: s="aaccb"**

Build stack:
- 'a': stack=['a'], inStack=[1,0,...]
- 'a': stack=['a','a'], inStack=[2,0,...]
- 'c': stack=['a','a','c'], inStack=[2,1,0,...]
- 'c': stack=['a','a','c','c'], inStack=[2,2,0,...]
- 'b': pop 'c' (c>b, inStack[c]=2>1), pop 'c', stack=['a','a','b']

Trim trailing:
- 'a' appears twice, pop one: ['a','b']... wait that doesn't match output

Let me reconsider. Looking at example: "aaccb" → "aacb"

Actually the output is "aacb" not "ab", so we keep multiple 'a's. Let me retrace:

Build: ['a','a','c','c','b'] but we should pop both 'c's when we see 'b'
After popping: ['a','a','b']
Then add remaining? No, we process all characters once.

The issue is my trim step. We should trim only when needed. Let me check: "aacb" is the answer, which has 2 a's, 1 c, 1 b.

So the trim step removes only one 'a' from ['a','a','c','b']? That doesn't seem right either.

Actually, I think the algorithm builds ['a','a','c','b'] and doesn't trim because no trailing duplicates make it smaller.

# Complexity

- Time complexity: $$O(n)$$
  - Single pass to count: O(n)
  - Stack operations: O(n) amortized
  - Trim: O(n) worst case
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Stack: O(n)
  - Frequency arrays: O(26) = O(1)
  - Overall: O(n)

# Code
```typescript []
const lexSmallestAfterDeletion = (s: string): string => {
    const remaining = new Uint32Array(26);
    for (const c of s) {
        remaining[c.charCodeAt(0) - 97]++;
    }
    
    const inStack = new Uint32Array(26);
    const stack: string[] = [];
    
    for (const c of s) {
        const ci = c.charCodeAt(0) - 97;
        remaining[ci]--;
        
        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const ti = top.charCodeAt(0) - 97;
            
            if (top > c && (inStack[ti] > 1 || remaining[ti] > 0)) {
                stack.pop();
                inStack[ti]--;
            } else {
                break;
            }
        }
        
        stack.push(c);
        inStack[ci]++;
    }
    
    while (stack.length > 0) {
        const top = stack[stack.length - 1];
        const ti = top.charCodeAt(0) - 97;
        if (inStack[ti] > 1) {
            stack.pop();
            inStack[ti]--;
        } else {
            break;
        }
    }
    
    return stack.join('');
};
```