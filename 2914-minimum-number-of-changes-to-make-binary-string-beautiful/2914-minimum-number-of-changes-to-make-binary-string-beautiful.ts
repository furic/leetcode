const minChanges = (s: string): number => {
    let changes = 0;

    // Every aligned pair (2i, 2i+1) must match, so each mismatched pair costs one change
    for (let i = 0; i < s.length; i += 2)
        if (s[i] !== s[i + 1]) changes++;

    return changes;
};