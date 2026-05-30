const getResults = (queries: number[][]): boolean[] => {
    let maxX = 0;
    for (const q of queries) maxX = Math.max(maxX, q[1]);

    // Segment tree sized to next power of 2 above maxX
    let size = 1;
    while (size <= maxX + 1) size *= 2;
    const tree = new Int32Array(2 * size);

    const update = (pos: number, val: number): void => {
        for (tree[pos += size] = val; pos > 1; pos >>= 1)
            tree[pos >> 1] = Math.max(tree[pos], tree[pos ^ 1]);
    };

    // Range max query over [0, right]
    const queryMax = (right: number): number => {
        let result = 0;
        for (let lo = size, hi = right + size + 1; lo < hi; lo >>= 1, hi >>= 1) {
            if (lo & 1) result = Math.max(result, tree[lo++]);
            if (hi & 1) result = Math.max(result, tree[--hi]);
        }
        return result;
    };

    const obstaclePositions: number[] = [0]; // Sentinel at origin
    const results: boolean[] = [];

    for (const q of queries) {
        const [type, x] = q;

        // Binary search: find insertion point for x in obstaclePositions
        let lo = 0, hi = obstaclePositions.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (obstaclePositions[mid] > x) hi = mid;
            else lo = mid + 1;
        }
        const insertIdx = lo;

        if (type === 1) {
            const prevObstacle = obstaclePositions[insertIdx - 1];
            const nextObstacle = insertIdx < obstaclePositions.length ? obstaclePositions[insertIdx] : -1;

            update(x, x - prevObstacle);
            if (nextObstacle !== -1) update(nextObstacle, nextObstacle - x);
            obstaclePositions.splice(insertIdx, 0, x);
        } else {
            const blockSize = q[2];
            const prevObstacle = obstaclePositions[insertIdx - 1];
            const maxGap = Math.max(x - prevObstacle, queryMax(prevObstacle));
            results.push(blockSize <= maxGap);
        }
    }

    return results;
};