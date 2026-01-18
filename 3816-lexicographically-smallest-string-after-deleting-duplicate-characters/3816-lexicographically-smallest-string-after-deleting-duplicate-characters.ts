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
    
    // Trim trailing duplicates - shorter is smaller when prefix matches
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