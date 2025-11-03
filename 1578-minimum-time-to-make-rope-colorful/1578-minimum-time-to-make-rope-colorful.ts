const minCost = (colors: string, neededTime: number[]): number => {
    let previousBalloonIndex = 0;
    let totalRemovalTime = 0;

    // Compare each balloon with the previous non-duplicate balloon
    for (let currentIndex = 1; currentIndex < colors.length; currentIndex++) {
        if (colors[currentIndex] === colors[previousBalloonIndex]) {
            // Same color as previous - must remove one balloon
            // Remove the one with less time (keep the more expensive one)
            if (neededTime[currentIndex] < neededTime[previousBalloonIndex]) {
                totalRemovalTime += neededTime[currentIndex];
            } else {
                totalRemovalTime += neededTime[previousBalloonIndex];
                previousBalloonIndex = currentIndex;
            }
        } else {
            // Different color - update reference balloon
            previousBalloonIndex = currentIndex;
        }
    }

    return totalRemovalTime;
};