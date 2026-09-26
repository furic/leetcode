const evaluate = (s: string, knowledge: string[][]): string => {
    const lookup = new Map<string, string>(knowledge as [string, string][]);
    let result = '';
    let i = 0;

    while (i < s.length) {
        if (s[i] !== '(') {
            result += s[i++];
        } else {
            i++; // skip '('
            let key = '';
            while (s[i] !== ')') key += s[i++];
            i++; // skip ')'
            result += lookup.get(key) ?? '?';
        }
    }

    return result;
};