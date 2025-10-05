const removeSubstring = (s: string, k: number): string => {
    // Stack stores [character, count] pairs for consecutive segments
    const stack: [string, number][] = [];
    
    for (const char of s) {
        // Add character to stack (merge with top if same character)
        if (stack.length === 0 || stack[stack.length - 1][0] !== char) {
            stack.push([char, 1]);
        } else {
            stack[stack.length - 1][1]++;
        }
        
        // Try to remove k-balanced substrings from the top of stack
        while (stack.length >= 2) {
            const top = stack[stack.length - 1];
            const below = stack[stack.length - 2];
            
            // Check if we can form a k-balanced substring
            if (below[0] === '(' && top[0] === ')' && 
                below[1] >= k && top[1] >= k) {
                
                // Remove k from each
                below[1] -= k;
                top[1] -= k;
                
                // Remove segments with count 0
                if (top[1] === 0) stack.pop();
                if (stack.length > 0 && stack[stack.length - 1][1] === 0) {
                    stack.pop();
                }
                // Continue checking in case new top elements can match
            } else {
                break;
            }
        }
    }
    
    // Reconstruct string from stack
    return stack.map(([char, count]) => char.repeat(count)).join('');
};