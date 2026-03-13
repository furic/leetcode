function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    let merged: number[][] = [];
    for (let interval of intervals) {
        // if the list of merged intervals is empty or if the current
        // interval does not overlap with the previous, append it
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        }
        // otherwise, there is overlap, so we merge the current and previous
        // intervals
        else {
            merged[merged.length - 1][1] = Math.max(
                merged[merged.length - 1][1],
                interval[1],
            );
        }
    }
    return merged;
}