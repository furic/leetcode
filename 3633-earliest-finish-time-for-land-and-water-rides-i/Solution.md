# Best First Finish + Min Second Ride | 14 Lines | O(n + m) | 1ms

# Intuition
The tourist does exactly one ride from each category in some order. For a fixed ordering (e.g. land then water), the optimal strategy is to pick the land ride that finishes earliest, then pick the water ride that finishes earliest given that start constraint. Try both orderings and take the minimum.

# Approach
- `earliestFinishSequence(first, second)`: find the minimum finish time of any "first" ride, then find the minimum finish time of any "second" ride where the tourist arrives after the first ride ends (waiting if needed: `max(secondStart[j], bestFirstFinish) + secondDuration[j]`).
- Run this for both orderings (land→water and water→land) and return the overall minimum.
- Greedy correctness: independently minimizing each phase is valid because the first ride choice only affects the arrival time for the second, and we minimize that arrival time by picking the earliest-finishing first ride.

# Complexity
- Time complexity: $$O(n + m)$$ — two passes for each of the two orderings.

- Space complexity: $$O(1)$$.

# Code
```typescript []
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
```