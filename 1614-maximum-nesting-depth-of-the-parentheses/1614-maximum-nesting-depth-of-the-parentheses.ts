const maxDepth = (s: string): number => {
    let maxNesting = 0, depth = 0;
    for (const ch of s) {
        if      (ch === '(') maxNesting = Math.max(maxNesting, ++depth);
        else if (ch === ')') depth--;
    }
    return maxNesting;
};