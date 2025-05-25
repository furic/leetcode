const maxSubstrings = (word: string): number => {
    const n = word.length;
    const pos: Record<string, number[]> = {};
    for (let i = 0; i < n; ++i) {
        const c = word[i];
        if (!pos[c]) pos[c] = [];
        pos[c].push(i);
    }
    const intervals: [number, number][] = [];
    for (const c in pos) {
        const arr = pos[c];
        let l = 0, r = 0;
        while (l < arr.length) {
            r = l + 1;
            while (r < arr.length && arr[r] - arr[l] < 3) r++;
            if (r < arr.length) {
                intervals.push([arr[l], arr[r]]);
            }
            l++;
        }
    }
    intervals.sort((a, b) => a[1] - b[1]);
    let res = 0, lastEnd = -1;
    for (const [start, end] of intervals) {
        if (start > lastEnd) {
            res++;
            lastEnd = end;
        }
    }
    return res;
};