const minGroups = (intervals: number[][]): number => {
    const [startTimes, endTimes] = intervals.reduce(
        ([starts, ends], [start, end]) => {
            starts.push(start);
            ends.push(end);
            return [starts, ends];
        },
        [[], []] as [number[], number[]]
    );

    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);

    let activeGroups = 0;
    let maxGroups = 0;
    let startPointer = 0;
    let endPointer = 0;

    while (startPointer < intervals.length) {
        if (startTimes[startPointer] <= endTimes[endPointer]) {
            activeGroups++;
            maxGroups = Math.max(maxGroups, activeGroups);
            startPointer++;
        } else {
            activeGroups--;
            endPointer++;
        }
    }

    return maxGroups;
};