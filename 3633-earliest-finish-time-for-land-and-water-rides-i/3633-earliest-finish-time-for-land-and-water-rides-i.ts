// Earliest finish time when doing a "first" ride then a "second" ride:
// Try every combination, take the minimum over all first-ride choices,
// then for each finish time find the best second ride.
const earliestFinishSequence = (
    firstStart: number[], firstDuration: number[],
    secondStart: number[], secondDuration: number[],
): number => {
    let bestFirstFinish = Infinity;
    for (let i = 0; i < firstStart.length; i++)
        bestFirstFinish = Math.min(bestFirstFinish, firstStart[i] + firstDuration[i]);

    let bestTotalFinish = Infinity;
    for (let j = 0; j < secondStart.length; j++)
        bestTotalFinish = Math.min(bestTotalFinish, Math.max(secondStart[j], bestFirstFinish) + secondDuration[j]);

    return bestTotalFinish;
};

const earliestFinishTime = (
    landStartTime: number[], landDuration: number[],
    waterStartTime: number[], waterDuration: number[],
): number => Math.min(
    earliestFinishSequence(landStartTime, landDuration, waterStartTime, waterDuration),
    earliestFinishSequence(waterStartTime, waterDuration, landStartTime, landDuration),
);