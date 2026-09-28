function maxDepth(s: string): number {
    let depth = 0;
    let r = 0;
    for (const c of s) {
        if (c === ')') {
            depth--;
            continue;
        }
        // Digits and operators
        if (c !== '(') continue;
        depth++;
        // New max only possible after '('
        if (depth > r) r = depth;
    }
    return r;
};