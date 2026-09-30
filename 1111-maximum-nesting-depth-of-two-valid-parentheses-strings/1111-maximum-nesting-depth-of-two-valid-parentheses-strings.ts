const maxDepthAfterSplit = (seq: string): number[] => {
    // Alternate groups by nesting depth parity: even depth opens go to A, odd to B (and vice versa on close)
    let depth = 0;
    return [...seq].map(ch => {
        if (ch === '(') return depth++ & 1;
        return --depth & 1;
    });
};