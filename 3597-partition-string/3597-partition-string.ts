const partitionString = (s: string): string[] => {
    const segments: string[] = [];
    const seen = new Set<string>();
    let currentSegment = '';

    for (const char of s) {
        currentSegment += char;
        if (!seen.has(currentSegment)) {
            segments.push(currentSegment);
            seen.add(currentSegment);
            currentSegment = '';
        }
    }

    return segments;
};