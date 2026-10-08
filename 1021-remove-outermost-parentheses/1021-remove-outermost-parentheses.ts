const removeOuterParentheses = (s: string): string => {
    let result = '';
    let depth = 0;

    for (const ch of s) {
        if (ch === '(') {
            if (depth > 0) result += ch;
            depth++;
        } else {
            depth--;
            if (depth > 0) result += ch;
        }
    }

    return result;
};