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

    const results: number[] = [];

    for (const query of sortedQueries) {
        let [start, end] = query;
        if (start === end) {
            results.push(0);
            continue;
        }

        let startPos = position[start];
        let endPos = position[end];
        if (startPos > endPos) [startPos, endPos] = [endPos, startPos];

        if (Math.abs(nums[start] - nums[end]) <= maxDiff) {
            results.push(1);
            continue;
        }

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
            if (reachableIndex[current] >= endPos) {
                results.push(jumpCount + 1);
            } else {
                results.push(-1);
            }
        } else {
            results.push(1);
        }
    }

    return results;
};