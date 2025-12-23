function maxTwoEvents(events: number[][]): number {
    events.sort((a, b) => (a[0] !== b[0]) ? a[0] - b[0] : a[1] - b[1]);

    const n = events.length;
    const starts: number[] = new Array(n);
    const suffix: number[] = new Array(n);

    for (let i = 0; i < n; i++) starts[i] = events[i][0];

    suffix[n - 1] = events[n - 1][2];
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = Math.max(suffix[i + 1], events[i][2]);
    }

    const lowerBound = (arr: number[], target: number): number => {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    let res = 0;
    for (let i = 0; i < n; i++) {
        const idx = lowerBound(starts, events[i][1] + 1);
        let val = events[i][2];
        if (idx < n) val += suffix[idx];
        res = Math.max(res, val);
    }
    return res;
};