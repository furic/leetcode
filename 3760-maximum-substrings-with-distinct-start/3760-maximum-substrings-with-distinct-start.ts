const maxDistinct = (s: string): number => {
    const used = new Set<string>();
    let count = 0;

    for (const char of s) {
        if (!used.has(char)) {
            count++;
            used.add(char);
        }
    }

    return count;
};