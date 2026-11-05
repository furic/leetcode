function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
    const w = d + 1;  // two values in one bucket are at most d apart
    const lo = new Map<number, number>(), hi = new Map<number, number>();  // smallest and largest b in each bucket
    for (const b of arr2) {
        const k = Math.floor(b / w);
        lo.set(k, Math.min(lo.get(k) ?? b, b));
        hi.set(k, Math.max(hi.get(k) ?? b, b));
    }
    const far = (a: number): boolean => {  // own bucket empty, neighbours' closest values out of reach
        const k = Math.floor(a / w);
        return !lo.has(k) && (hi.get(k - 1) ?? -Infinity) < a - d && (lo.get(k + 1) ?? Infinity) > a + d;
    };
    return arr1.filter(far).length;
}