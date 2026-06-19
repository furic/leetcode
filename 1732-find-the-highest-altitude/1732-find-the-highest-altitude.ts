function largestAltitude(gain: number[]): number {
    let res = 0, curr = 0;
    for (const x of gain) {
        curr += x;
        res = Math.max(res, curr);
    }
    return res;
};