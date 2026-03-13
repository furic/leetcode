function merge(intervals: number[][]): number[][] {
    // [1     3]
    //    [2       6]
    // If cur end is > next_start, combine
    intervals.sort((a, b) => a[0] - b[0])
    if (intervals.length === 0 || intervals.length === 1) return intervals
    const new_intervals = []
    let curr_interval = intervals[0]
    
    for (let i = 1; i < intervals.length; i++) {
        const next_interval = intervals[i]
        const current_end = curr_interval[1]
        const next_start = next_interval[0]
        if (current_end >= next_start) {
            curr_interval[1] = Math.max(next_interval[1], curr_interval[1])
        } else  {
            new_intervals.push(curr_interval)
            curr_interval = next_interval
        } 
    }
    new_intervals.push(curr_interval)
    return new_intervals
};