const maxSubarrays = (n: number, conflictingPairs: number[][]): number => {
    const minConflict1 = Array(n + 1).fill(Infinity);
    const minConflict2 = Array(n + 1).fill(Infinity);

    // Track two smallest "b" values that conflict with each "a"
    conflictingPairs.forEach(([a, b]) => {
        const lower = Math.min(a, b);
        const upper = Math.max(a, b);
        if (minConflict1[lower] > upper) {
            minConflict2[lower] = minConflict1[lower];
            minConflict1[lower] = upper;
        } else if (minConflict2[lower] > upper) {
            minConflict2[lower] = upper;
        }
    });

    let totalSubarrays = 0;
    let bestMinIndex = n;
    let secondMin = Infinity;
    const removalBonus = Array(n + 1).fill(0);

    // Traverse from right to left to calculate valid ranges
    for (let i = n; i >= 1; i--) {
        const currentMin1 = minConflict1[i];

        if (minConflict1[bestMinIndex] > currentMin1) {
            secondMin = Math.min(secondMin, minConflict1[bestMinIndex]);
            bestMinIndex = i;
        } else {
            secondMin = Math.min(secondMin, currentMin1);
        }

        const rightLimit = Math.min(minConflict1[bestMinIndex], n + 1);
        totalSubarrays += rightLimit - i;

        const earliestConflictFree = Math.min(secondMin, minConflict2[bestMinIndex], n + 1);
        removalBonus[bestMinIndex] += earliestConflictFree - rightLimit;
    }

    return totalSubarrays + Math.max(...removalBonus);
};