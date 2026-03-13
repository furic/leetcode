function merge(intervals: number[][]): number[][] {
    if (!intervals.length) return []
    const mergedIntervals: number[][] = []
    intervals.sort((a, b) => a[0] - b[0])

    for (let interval of intervals) {
        if (!mergedIntervals.length || interval[0] > mergedIntervals[mergedIntervals.length - 1][1]) {
            mergedIntervals.push(interval)
        } else {
            mergedIntervals[mergedIntervals.length - 1][1] = Math.max(mergedIntervals[mergedIntervals.length - 1][1], interval[1])
        }
    }
    return mergedIntervals
};