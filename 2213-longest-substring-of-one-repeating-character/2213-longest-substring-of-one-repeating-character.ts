const longestRepeating = (s: string, queryCharacters: string, queryIndices: number[]): number[] => {
    const n = s.length;
    const chars = s.split('');
    const size = 1 << (Math.ceil(Math.log2(n)) + 1);

    const maxRun    = new Int32Array(size);
    const prefLen   = new Int32Array(size);
    const sufLen    = new Int32Array(size);
    const prefChar  = new Int8Array(size);
    const sufChar   = new Int8Array(size);
    const rangeLen  = new Int32Array(size);

    const mergeUp = (idx: number): void => {
        const l = idx << 1, r = (idx << 1) | 1;

        rangeLen[idx] = rangeLen[l] + rangeLen[r];

        prefLen[idx]  = prefLen[l];
        prefChar[idx] = prefChar[l];
        if (prefLen[l] === rangeLen[l] && prefChar[l] === prefChar[r])
            prefLen[idx] += prefLen[r];

        sufLen[idx]  = sufLen[r];
        sufChar[idx] = sufChar[r];
        if (sufLen[r] === rangeLen[r] && sufChar[r] === sufChar[l])
            sufLen[idx] += sufLen[l];

        maxRun[idx] = Math.max(maxRun[l], maxRun[r]);
        if (sufChar[l] === prefChar[r])
            maxRun[idx] = Math.max(maxRun[idx], sufLen[l] + prefLen[r]);
    };

    const build = (idx: number, lo: number, hi: number): void => {
        if (lo === hi) {
            const code = chars[lo].charCodeAt(0);
            maxRun[idx] = prefLen[idx] = sufLen[idx] = rangeLen[idx] = 1;
            prefChar[idx] = sufChar[idx] = code;
            return;
        }
        const mid = (lo + hi) >> 1;
        build(idx << 1, lo, mid);
        build((idx << 1) | 1, mid + 1, hi);
        mergeUp(idx);
    };

    const pointUpdate = (idx: number, lo: number, hi: number, pos: number, ch: string): void => {
        if (lo === hi) {
            chars[pos] = ch;
            const code = ch.charCodeAt(0);
            prefChar[idx] = sufChar[idx] = code;
            return;
        }
        const mid = (lo + hi) >> 1;
        if (pos <= mid) pointUpdate(idx << 1, lo, mid, pos, ch);
        else            pointUpdate((idx << 1) | 1, mid + 1, hi, pos, ch);
        mergeUp(idx);
    };

    build(1, 0, n - 1);

    return queryIndices.map((pos, i) => {
        pointUpdate(1, 0, n - 1, pos, queryCharacters[i]);
        return maxRun[1];
    });
};