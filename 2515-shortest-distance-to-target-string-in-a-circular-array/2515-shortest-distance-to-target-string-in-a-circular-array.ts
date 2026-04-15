const closestTarget = (words: string[], target: string, startIndex: number): number => {
    const circularLength = words.length;
    let shortestDistance = circularLength;

    for (let i = 0; i < circularLength; i++) {
        if (words[i] === target) {
            const linearDistance = Math.abs(i - startIndex);
            const wrappedDistance = circularLength - linearDistance;
            shortestDistance = Math.min(shortestDistance, linearDistance, wrappedDistance);
        }
    }

    return shortestDistance < circularLength ? shortestDistance : -1;
};