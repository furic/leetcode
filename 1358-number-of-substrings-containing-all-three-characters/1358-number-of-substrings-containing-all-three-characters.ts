const numberOfSubstrings = (s: string): number => {
    const lastSeen = [-1, -1, -1]; // last index where 'a', 'b', 'c' were seen
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        lastSeen[s.charCodeAt(i) - 97] = i;

        // For substrings ending at i, the leftmost valid start is bounded by
        // the earliest of the three last-seen positions — every start <= that bound works
        count += 1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]);
    }

    return count;
};