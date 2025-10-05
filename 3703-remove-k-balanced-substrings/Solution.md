# Stack Character Compression | 36 Lines | O(n) | 120ms

# Intuition
We need to repeatedly remove k-balanced substrings (k consecutive '(' followed by k consecutive ')') until none remain. A stack-based approach works well here because we can process characters left-to-right and immediately detect when removal conditions are met.

# Approach
**Character Compression Strategy:**
- Use a stack to store consecutive character segments as [character, count] pairs
- This compression allows us to efficiently track runs of identical characters

**Processing Flow:**
- For each character in the input string:
  - Add it to the stack by either creating a new segment or incrementing the count of the top segment if it matches
  - After adding, attempt to remove k-balanced substrings from the stack top

**Removal Logic:**
- Check if the top two segments can form a k-balanced substring:
  - The second-to-top segment must be '(' with count ≥ k
  - The top segment must be ')' with count ≥ k
- If conditions are met, decrement both counts by k
- Remove any segments that reach count 0
- Continue checking in a loop because removing one substring might expose another valid pair beneath it

**Why Loop for Removal:**
- After removing a k-balanced substring, the new top elements might also form a valid pair
- For example, if stack is [('(', 3), (')', 2), ('(', 2), (')', 3)], removing k=2 from the middle pair exposes the outer pair

**Reconstruction:**
- Convert the final stack back to a string by repeating each character according to its count

# Complexity
- Time complexity: $$O(n)$$ where n is the length of the string - each character is pushed once and popped at most once
- Space complexity: $$O(n)$$ for the stack

# Code
```typescript
const removeSubstring = (s: string, k: number): string => {
    const stack: [string, number][] = [];
    
    for (const char of s) {
        if (stack.length === 0 || stack[stack.length - 1][0] !== char) {
            stack.push([char, 1]);
        } else {
            stack[stack.length - 1][1]++;
        }
        
        while (stack.length >= 2) {
            const top = stack[stack.length - 1];
            const below = stack[stack.length - 2];
            
            if (below[0] === '(' && top[0] === ')' && 
                below[1] >= k && top[1] >= k) {
                
                below[1] -= k;
                top[1] -= k;
                
                if (top[1] === 0) stack.pop();
                if (stack.length > 0 && stack[stack.length - 1][1] === 0) {
                    stack.pop();
                }
            } else {
                break;
            }
        }
    }
    
    return stack.map(([char, count]) => char.repeat(count)).join('');
};
```