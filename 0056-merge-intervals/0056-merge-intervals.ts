function merge(intervals: number[][]): number[][] {
    if(intervals.length < 2) {
        return intervals
    }

    const sortedIntervals = intervals.sort((a, b) => a[0] - b[0])

    let result = [sortedIntervals[0]]

    for(let interval of sortedIntervals) {
        let resent = result[result.length - 1]
        if(resent[1] >= interval[0]) {
            resent[1] = Math.max(resent[1], interval[1])
        } else {
            result.push(interval)
        }
    }

    return result
};