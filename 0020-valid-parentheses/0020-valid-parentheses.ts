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
            // Closing bracket with no matching open bracket
            if (openBrackets.length === 0) {
                return false;
            }
            
            const lastOpenBracket = openBrackets.pop()!;
            const expectedOpenBracket = bracketPairs[char];
            
            // Mismatched bracket types
            if (lastOpenBracket !== expectedOpenBracket) {
                return false;
            }
        }
    }
    
    // All brackets must be closed
    return openBrackets.length === 0;
};