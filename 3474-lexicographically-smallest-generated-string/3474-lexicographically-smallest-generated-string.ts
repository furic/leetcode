const generateString = (str1: string, str2: string): string => {
    const n = str1.length;
    const m = str2.length;

    // Phase 1: fix positions required by 'T' constraints, leave the rest as '?'
    const result: string[] = Array(n + m - 1).fill('?');

    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'T') continue;
        for (let j = 0; j < m; j++) {
            const existing = result[i + j];
            if (existing !== '?' && existing !== str2[j]) return '';
            result[i + j] = str2[j];
        }
    }

    // Track which positions were free before filling '?' with 'a'
    const wasUndecided = result.map(ch => ch === '?');
    for (let i = 0; i < result.length; i++)
        if (result[i] === '?') result[i] = 'a';

    // Phase 2: fix 'F' violations by changing the rightmost free position in the window to 'b'
    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'F') continue;
        if (result.slice(i, i + m).join('') !== str2) continue;

        // Window currently matches str2 — flip the rightmost free char to break the match
        let fixed = false;
        for (let j = i + m - 1; j >= i; j--) {
            if (wasUndecided[j]) {
                result[j] = 'b';
                fixed = true;
                break;
            }
        }
        if (!fixed) return '';
    }

    return result.join('');
};