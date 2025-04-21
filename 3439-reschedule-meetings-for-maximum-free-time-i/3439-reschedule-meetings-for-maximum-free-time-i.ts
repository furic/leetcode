const maxFreeTime = (eventTime: number, k: number, startTime: number[], endTime: number[]): number => {
    const eventCount = startTime.length;

    // Calculate gaps between meetings
    const gaps: number[] = [];
    for (let i = 1; i < eventCount; i++) {
        gaps.push(startTime[i] - endTime[i - 1]);
    }

    // Add gaps before the first meeting and after the last meeting
    gaps.unshift(startTime[0]);
    gaps.push(eventTime - endTime[eventCount - 1]);

    // If k >= number of gaps, we can merge all gaps
    if (k >= gaps.length - 1) {
        return gaps.reduce((a, b) => a + b, 0);
    }

    // Sliding window to find the maximum sum of gaps after rescheduling k meetings
    // In other words, merge (k + 1) adjacent gaps and see which creates the biggest gap
    // For instance, if k=1, we merge any 2 adjacent gaps, and so on

    let result = 0;
    let freeTime = gaps.slice(0, k + 1).reduce((a, b) => a + b, 0);
    result = freeTime;
    for (let i = k + 1; i < gaps.length; i++) {
        freeTime += gaps[i] - gaps[i - (k + 1)];
        result = Math.max(result, freeTime);
    }

    return result;
}