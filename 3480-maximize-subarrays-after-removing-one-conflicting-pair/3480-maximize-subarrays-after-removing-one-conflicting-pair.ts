const maxSubarrays = (n: number, conflictingPairs: number[][]): number => {
    const bMin1 = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const bMin2 = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    for (const pair of conflictingPairs) {
        const a = Math.min(pair[0], pair[1]),
            b = Math.max(pair[0], pair[1]);
        if (bMin1[a] > b) {
            bMin2[a] = bMin1[a];
            bMin1[a] = b;
        } else if (bMin2[a] > b) {
            bMin2[a] = b;
        }
    }
    let res = 0,
        ib1 = n,
        b2 = Number.MAX_SAFE_INTEGER;
    const delCount = Array(n + 1).fill(0);
    for (let i = n; i >= 1; i--) {
        if (bMin1[ib1] > bMin1[i]) {
            b2 = Math.min(b2, bMin1[ib1]);
            ib1 = i;
        } else {
            b2 = Math.min(b2, bMin1[i]);
        }
        res += Math.min(bMin1[ib1], n + 1) - i;
        delCount[ib1] +=
            Math.min(Math.min(b2, bMin2[ib1]), n + 1) -
            Math.min(bMin1[ib1], n + 1);
    }
    return res + Math.max(...delCount);
};