function maxTwoEvents(events: number[][]): number {
    const n = events.length;
    events.sort((a, b) => a[0] - b[0]);
    const suf = new Uint32Array(n);
    suf[n - 1] = events[n - 1][2];
    for (let i = n - 2; i >= 0; i--) {
        suf[i] = Math.max(events[i][2], suf[i + 1]);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let l = i + 1;
        let r = n - 1;
        let j = -1;
        const end = events[i][1];
        while (l <= r) {
            const m = (l + r) >> 1;
            if (events[m][0] > end) {
                j = m;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        let score = events[i][2];
        if (j !== -1) {
            score += suf[j];
        }
        ans = Math.max(ans, score);
    }
    return ans;
};