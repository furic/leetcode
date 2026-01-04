const findMaxVal = (n: number, restrictions: number[][], diff: number[]): number => {
    const maxReachable = new Array(n);
    maxReachable[0] = 0;

    for (let i = 1; i < n; i++) {
        maxReachable[i] = maxReachable[i - 1] + diff[i - 1];
    }
    
    for (const [idx, maxVal] of restrictions) {
        maxReachable[idx] = Math.min(maxReachable[idx], maxVal);
    }

    for (let i = n - 2; i >= 0; i--) {
        maxReachable[i] = Math.min(maxReachable[i], maxReachable[i + 1] + diff[i]);
    }

    for (let i = 1; i< n; i++) {
        maxReachable[i] = Math.min(maxReachable[i], maxReachable[i - 1] + diff[i - 1]);
    }

    return Math.max(...maxReachable);
};