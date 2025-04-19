function reorganizeString(s: string): string {
    let charCountMap = new Map<string, number>();

    // Count character occurrences
    for (const c of s) {
        charCountMap.set(c, (charCountMap.get(c) || 0) + 1);
    }

    // Find character with max occurrences
    const maxCharCount = Math.max(...charCountMap.values());

    // If a character appears more than half the length of the string, reorganization is impossible
    if (maxCharCount > Math.ceil(s.length / 2)) return '';

    // Convert Map to array and sort characters by frequency (descending)
    const sortedChars = [...charCountMap.entries()].sort((a, b) => b[1] - a[1]);

    // Fill the result array
    let res: string[] = new Array(s.length);
    let index = 0;

    // Place the most frequent characters first at even indices
    for (const [char, count] of sortedChars) {
        for (let i = 0; i < count; i++) {
            res[index] = char;
            index += 2;

            // If we reach the end of the array, restart at index 1
            if (index >= s.length) index = 1;
        }
    }

    return res.join('');
};