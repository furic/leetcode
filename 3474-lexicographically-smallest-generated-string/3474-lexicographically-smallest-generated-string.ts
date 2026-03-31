function generateString(S: string, t: string): string {
    const s = S.split('');
    const n = s.length;
    const m = t.length;
    const ans: string[] = Array(n + m - 1).fill('?'); // '?' indicates undecided positions

    // Process T
    for (let i = 0; i < n; i++) {
        if (s[i] !== 'T') continue;

        // Substring must equal t
        for (let j = 0; j < m; j++) {
            const v = ans[i + j];
            if (v !== '?' && v !== t[j]) return "";
            ans[i + j] = t[j];
        }
    }

    const oldAns = [...ans];
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] === '?')
            ans[i] = 'a'; // initial value for undecided positions is 'a'
    }

    // Process F
    for (let i = 0; i < n; i++) {
        if (s[i] !== 'F') continue;

        // Substring must not equal t
        if (ans.slice(i, i + m).join('') !== t) continue;

        // Find the last undecided position
        let ok = false;
        for (let j = i + m - 1; j >= i; j--) {
            if (oldAns[j] === '?') { // previously filled with 'a', now change to 'b'
                ans[j] = 'b';
                ok = true;
                break;
            }
        }

        if (!ok) return "";
    }

    return ans.join('');
};