const vowelConsonantScore = (s: string): number => {
    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
    let v = 0;
    let c = 0;
    
    for (const char of s) {
        if (char >= 'a' && char <= 'z') {
            if (VOWELS.has(char)) {
                v++;
            } else {
                c++;
            }
        }
    }
    
    return c > 0 ? Math.floor(v / c) : 0;
};