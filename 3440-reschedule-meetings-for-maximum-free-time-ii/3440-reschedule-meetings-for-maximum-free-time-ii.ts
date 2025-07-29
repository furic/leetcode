const maxFreeTime = (
    eventTime: number,
    startTime: number[],
    endTime: number[],
): number => {
    const n = startTime.length;
    const canReschedule: boolean[] = Array(n).fill(false);

    let maxGapBefore = 0;
    let maxGapAfter = 0;

    for (let i = 0; i < n; i++) {
        const currentMeetingLength = endTime[i] - startTime[i];
        const previousEnd = i === 0 ? 0 : endTime[i - 1];
        const gapBefore = startTime[i] - previousEnd;

        if (currentMeetingLength <= maxGapBefore) {
            canReschedule[i] = true;
        }
        maxGapBefore = Math.max(maxGapBefore, gapBefore);

        const reversedIndex = n - 1 - i;
        const reversedMeetingLength = endTime[reversedIndex] - startTime[reversedIndex];
        const nextStart = reversedIndex === n - 1 ? eventTime : startTime[reversedIndex + 1];
        const gapAfter = nextStart - endTime[reversedIndex];

        if (reversedMeetingLength <= maxGapAfter) {
            canReschedule[reversedIndex] = true;
        }
        maxGapAfter = Math.max(maxGapAfter, gapAfter);
    }

    let maxFree = 0;

    for (let i = 0; i < n; i++) {
        const previousEnd = i === 0 ? 0 : endTime[i - 1];
        const nextStart = i === n - 1 ? eventTime : startTime[i + 1];
        const occupiedTime = endTime[i] - startTime[i];
        const availableTime = nextStart - previousEnd;

        if (canReschedule[i]) {
            maxFree = Math.max(maxFree, availableTime);
        } else {
            maxFree = Math.max(maxFree, availableTime - occupiedTime);
        }
    }

    return maxFree;
};