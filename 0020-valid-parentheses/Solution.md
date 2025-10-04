# Stack Bracket Matching | 28 Lines | O(n) | 2ms

# Intuition
Brackets must be closed in the correct order, which follows a Last-In-First-Out (LIFO) pattern - the most recently opened bracket must be closed first. This naturally suggests using a stack data structure to track opening brackets.

# Approach
Use a stack to track opening brackets as we traverse the string. Create a mapping of closing brackets to their corresponding opening brackets for quick lookup. For each character: if it's an opening bracket, push it onto the stack; if it's a closing bracket, check if the stack is empty (invalid - no matching opener) or if the top of the stack matches the expected opening bracket. If they match, pop the stack and continue; otherwise, return false. After processing all characters, the stack must be empty for the string to be valid - any remaining opening brackets mean they were never closed.

# Complexity
- Time complexity: $$O(n)$$ where n is the length of the string
- Space complexity: $$O(n)$$ for the stack in worst case (all opening brackets)

# Code
```typescript
const isValid = (s: string): boolean => {
    const openBrackets: string[] = [];
    const bracketPairs: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (const char of s) {
        const isOpenBracket = char === '(' || char === '[' || char === '{';
        
        if (isOpenBracket) {
            openBrackets.push(char);
        } else {
            if (openBrackets.length === 0) {
                return false;
            }
            
            const lastOpenBracket = openBrackets.pop()!;
            const expectedOpenBracket = bracketPairs[char];
            
            if (lastOpenBracket !== expectedOpenBracket) {
                return false;
            }
        }
    }
    
    return openBrackets.length === 0;
};
```