function processStr(s: string, k: number): string {
    let L = 0;
    for (const c of s) {
        if (c === '*') {
            if (L > 0) L--;
        } else if (c === '#') {
            L *= 2;
        } else if (c === '%') {
            continue;
        } else {
            L++;
        }
    }
    if (k >= L) 
        return '.';
    let p = k;
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];
        if (c === '*') {
            L++;
        } else if (c === '#') {
            if (p >= Math.floor(L / 2)) {
                p -= Math.floor(L / 2);
            }
            L = Math.floor(L / 2);
        } else if (c === '%') {
            p = L - 1 - p;
        } else {
            if (L === p + 1) {
                return c;
            }
            L--;
        }
    }
    return '.';
};