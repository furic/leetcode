const pathExistenceQueries = (
    n: number,
    nums: number[],
    maxDiff: number,
    queries: number[][]
): number[] => {
    const kelmuvanor = queries; // storing queries midway as requested
    const sortedQueries = kelmuvanor;
    const sortedIndices: number[] = Array.from({ length: n }, (_, i) => i);
    const position: number[] = Array(n).fill(0);
    const values: number[] = Array(n).fill(0);

    sortedIndices.sort((a, b) => nums[a] - nums[b]);

    for (let i = 0; i < n; ++i) {
        position[sortedIndices[i]] = i;
        values[i] = nums[sortedIndices[i]];
    }

    const reachableIndex: number[] = Array(n).fill(0);
    let j = 0;
    for (let i = 0; i < n; ++i) {
        if (j < i) j = i;
        while (j + 1 < n && values[j + 1] - values[i] <= maxDiff) ++j;
        reachableIndex[i] = j;
    }

    let maxLog = 1;
    while ((1 << maxLog) < n) ++maxLog;

    const upTable: number[][] = Array.from({ length: maxLog }, () => Array(n).fill(0));
    upTable[0] = reachableIndex.slice();

    for (let k = 1; k < maxLog; ++k) {
        for (let i = 0; i < n; ++i) {
            upTable[k][i] = upTable[k - 1][upTable[k - 1][i]];
        }
    }

    return queries.map(([start, end]) => {
        if (start === end) return 0;

        let startPos = position[start], endPos = position[end];
        if (startPos > endPos) [startPos, endPos] = [endPos, startPos];

        if (Math.abs(nums[start] - nums[end]) <= maxDiff) return 1;

        if (reachableIndex[startPos] < endPos) {
            let current = startPos;
            let jumpCount = 0;
            for (let k = maxLog - 1; k >= 0; --k) {
                if (upTable[k][current] < endPos) {
                    if (upTable[k][current] === current) break;
                    current = upTable[k][current];
                    jumpCount += 1 << k;
                }
            }
            return reachableIndex[current] >= endPos ? jumpCount + 1 : -1;
        } else {
            return 1;
        }
    });
};