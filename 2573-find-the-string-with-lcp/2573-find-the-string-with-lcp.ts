const findTheString = (lcp: number[][]): string => {
    const n = lcp.length;
    const chars: string[] = new Array(n).fill('');
    let nextCharCode = 'a'.charCodeAt(0);

    // Greedily assign the next available letter, propagating matches via lcp
    for (let i = 0; i < n; i++) {
        if (!chars[i]) {
            if (nextCharCode > 'z'.charCodeAt(0)) return '';
            chars[i] = String.fromCharCode(nextCharCode++);
            for (let j = i + 1; j < n; j++) {
                if (lcp[i][j] > 0) chars[j] = chars[i];
            }
        }
    }

    // Validate: verify the assigned characters are consistent with the lcp values
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (chars[i] !== chars[j]) {
                if (lcp[i][j] !== 0) return '';
            } else {
                const expectedLcp = (i === n - 1 || j === n - 1) ? 1 : lcp[i + 1][j + 1] + 1;
                if (lcp[i][j] !== expectedLcp) return '';
            }
        }
    }

    return chars.join('');
};