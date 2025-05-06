const minTravelTime = (
    l: number,
    n: number,
    k: number,
    position: number[],
    time: number[]
): number => {
    const prefixSum: number[] = new Array(n).fill(0);
    prefixSum[0] = time[0];

    for (let i = 1; i < n - 1; i++) {
        prefixSum[i] = prefixSum[i - 1] + time[i];
    }

    const dp: (number | null)[][][] = Array.from({ length: k + 1 }, () =>
        Array.from({ length: n }, () =>
            new Array(n + 1).fill(null)
        )
    );

    return calculateMinTime(k, 0, 0, n, position, prefixSum, dp);
};

const calculateMinTime = (
    remainingMerges: number,
    currentIndex: number,
    lastUnmergedIndex: number,
    totalSigns: number,
    position: number[],
    prefixSum: number[],
    dp: (number | null)[][][]
): number => {
    if (currentIndex === totalSigns - 1) {
        return remainingMerges === 0 ? 0 : Infinity;
    }

    if (dp[remainingMerges][currentIndex][lastUnmergedIndex] !== null) {
        return dp[remainingMerges][currentIndex][lastUnmergedIndex]!;
    }

    const travelRate = prefixSum[currentIndex] - (lastUnmergedIndex > 0 ? prefixSum[lastUnmergedIndex - 1] : 0);
    let minTime = Infinity;

    const maxNextIndex = Math.min(totalSigns - 1, currentIndex + remainingMerges + 1);

    for (let nextIndex = currentIndex + 1; nextIndex <= maxNextIndex; nextIndex++) {
        const distance = position[nextIndex] - position[currentIndex];
        const segmentsMerged = nextIndex - currentIndex - 1;
        const timeForSegment = distance * travelRate;

        const totalTime = timeForSegment + calculateMinTime(
            remainingMerges - segmentsMerged,
            nextIndex,
            currentIndex + 1,
            totalSigns,
            position,
            prefixSum,
            dp
        );

        minTime = Math.min(minTime, totalTime);
    }

    dp[remainingMerges][currentIndex][lastUnmergedIndex] = minTime;
    return minTime;
};