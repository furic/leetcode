const clearStars = (s: string): string => {
    const charIndices: number[][] = Array.from({ length: 26 }, () => []);
    const chars = s.split('');

    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c !== '*') {
            const idx = c.charCodeAt(0) - 97;
            charIndices[idx].push(i);
        } else {
            // Remove the smallest available character (leftmost in lexicographical order)
            for (let j = 0; j < 26; j++) {
                if (charIndices[j].length > 0) {
                    const pos = charIndices[j].pop()!;
                    chars[pos] = '*';
                    break;
                }
            }
        }
    }

    return chars.filter(c => c !== '*').join('');
};