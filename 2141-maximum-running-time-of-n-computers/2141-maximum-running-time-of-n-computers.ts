function maxRunTime(n: number, batteries: number[]): number {
    const S = batteries.length;
    const sum = batteries.reduce((acc, b) => acc + b, 0);
    function canPower(x: number): boolean {
        const goal = n * x;
        let t = 0;
        for (const b of batteries) {
            t += Math.min(b, x);
            if (t >= goal) return true;
        }
        return false;
    }
    let l = 1, r = Math.floor(sum / n);
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (canPower(m)) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return r;
};