const maxSumDistinctTriplet = (x: number[], y: number[]): number => {
    const n = x.length;
    const map = new Map<number, number>();

    // Group and store top 3 y-values for each unique x
    for (let i = 0; i < n; i++) {
        map.set(x[i], Math.max(map.get(x[i]) ?? 0, y[i]));
    }

    if (map.size < 3) return -1;

    // Sort by y descending
    const candidates = [...map.values()].sort((a, b) => b - a);

    // Take top 3
    return candidates[0] + candidates[1] + candidates[2];
};