const maxNumOfSubstrings = (s: string): string[] => {
    const charFirst = new Array(26).fill(-1);
    const charLast  = new Array(26).fill(-1);
    const charCount = new Array(26).fill(0);
    const firstSeen: number[] = []; // chars in order of first appearance

    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 97;
        if (charCount[c] === 0) { charFirst[c] = i; firstSeen.push(c); }
        charCount[c]++;
        charLast[c] = i;
    }

    const result: string[] = [];
    let pending: number[][] = []; // [first, last, count] of unresolved chars

    for (const c of firstSeen) {
        pending.unshift([charFirst[c], charLast[c], charCount[c]]);

        let lo = Infinity, hi = -Infinity, total = 0;
        for (const [f, l, cnt] of pending) {
            total += cnt; lo = Math.min(lo, f); hi = Math.max(hi, l);
            if (total === hi - lo + 1) break; // all chars in [lo, hi] accounted for
        }

        if (total === hi - lo + 1) {
            result.push(s.slice(lo, hi + 1));
            pending = [];
        }
    }

    return result;
};