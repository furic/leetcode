const maxFreeTime = (
    eventTime: number,
    k: number,
    startTime: number[],
    endTime: number[],
): number => {
    const n = startTime.length;
    let maxContinuousFreeTime = 0;
    let occupiedWindowTime = 0;

    for (let i = 0; i < n; i++) {
        occupiedWindowTime += endTime[i] - startTime[i];

        const earliestPossibleStart = i <= k - 1 ? 0 : endTime[i - k];
        const latestPossibleEnd = i === n - 1 ? eventTime : startTime[i + 1];

        const currentFreeTime = latestPossibleEnd - earliestPossibleStart - occupiedWindowTime;
        maxContinuousFreeTime = Math.max(maxContinuousFreeTime, currentFreeTime);

        if (i >= k - 1) {
            occupiedWindowTime -= endTime[i - k + 1] - startTime[i - k + 1];
        }
    }

    return maxContinuousFreeTime;
};