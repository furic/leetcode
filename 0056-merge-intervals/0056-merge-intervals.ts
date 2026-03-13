const merge = (intervals: number[][]): number[][] => {
    intervals.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [intervals[0]];

    for (const interval of intervals) {
        const lastMerged = merged[merged.length - 1];
        if (interval[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], interval[1]);
        } else {
            merged.push(interval);
        }
    }

    return merged;
};