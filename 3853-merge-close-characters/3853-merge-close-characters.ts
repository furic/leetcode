const mergeCharacters = (s: string, k: number): string => {
    let chars = s.split('');

    let changed = true;
    while (changed) {
        changed = false;
        const next = chars;
        for (let i = 0; i < next.length; i++) {
            for (let j = i + 1; j <= i + k && j < next.length; j++) {
                if (next[j] === next[i]) {
                    chars = [...next.slice(0, j), ...next.slice(j + 1)];
                    changed = true;
                    break;
                }
            }
            if (changed) break;
        }
    }

    return chars.join('');
};