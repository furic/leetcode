const kthSmallest = (parents: number[], values: number[], queries: number[][]): number[] => {
    const n = values.length;
    const treeChildren: number[][] = Array.from({ length: n }, () => []);

    // Build tree structure
    for (let child = 1; child < n; child++) {
        const parent = parents[child];
        treeChildren[parent].push(child);
    }

    // Compute XOR from root to each node
    const pathXOR: number[] = Array(n).fill(0);
    pathXOR[0] = values[0];
    const stack: number[] = [0];

    while (stack.length) {
        const current = stack.pop()!;
        for (const child of treeChildren[current]) {
            pathXOR[child] = pathXOR[current] ^ values[child];
            stack.push(child);
        }
    }

    // Prepare for heavy-light decomposition
    const subtreeSize: number[] = Array(n).fill(0);
    const heavyChild: number[] = Array(n).fill(-1);

    const computeSubtreeSize = (node: number) => {
        subtreeSize[node] = 1;
        let maxSubtree = 0;
        for (const child of treeChildren[node]) {
            computeSubtreeSize(child);
            subtreeSize[node] += subtreeSize[child];
            if (subtreeSize[child] > maxSubtree) {
                maxSubtree = subtreeSize[child];
                heavyChild[node] = child;
            }
        }
    };
    computeSubtreeSize(0);

    // Coordinate compression for XOR values
    const uniqueXOR = Array.from(new Set(pathXOR)).sort((a, b) => a - b);
    const xorToIndex = new Map<number, number>();
    uniqueXOR.forEach((val, idx) => xorToIndex.set(val, idx));
    const m = uniqueXOR.length;

    // Segment Tree for kth smallest
    const segTree: number[] = Array(4 * m).fill(0);
    const xorFreq: number[] = Array(m).fill(0);

    const updateSegmentTree = (node: number, l: number, r: number, idx: number, val: number): void => {
        if (l === r) {
            segTree[node] = val;
            return;
        }
        const mid = (l + r) >> 1;
        if (idx <= mid) {
            updateSegmentTree(2 * node + 1, l, mid, idx, val);
        } else {
            updateSegmentTree(2 * node + 2, mid + 1, r, idx, val);
        }
        segTree[node] = segTree[2 * node + 1] + segTree[2 * node + 2];
    };

    const findKthSmallest = (k: number): number => {
        let node = 0, l = 0, r = m - 1;
        while (l < r) {
            const mid = (l + r) >> 1;
            const left = 2 * node + 1;
            if (segTree[left] >= k) {
                node = left;
                r = mid;
            } else {
                k -= segTree[left];
                node = 2 * node + 2;
                l = mid + 1;
            }
        }
        return l;
    };

    const addXOR = (node: number): void => {
        const idx = xorToIndex.get(pathXOR[node])!;
        if (xorFreq[idx]++ === 0) {
            updateSegmentTree(0, 0, m - 1, idx, 1);
        }
    };

    const removeXOR = (node: number): void => {
        const idx = xorToIndex.get(pathXOR[node])!;
        if (--xorFreq[idx] === 0) {
            updateSegmentTree(0, 0, m - 1, idx, 0);
        }
    };

    const addSubtree = (node: number): void => {
        addXOR(node);
        for (const child of treeChildren[node]) addSubtree(child);
    };

    const removeSubtree = (node: number): void => {
        removeXOR(node);
        for (const child of treeChildren[node]) removeSubtree(child);
    };

    // Map queries to each node
    const queriesByNode = new Map<number, [number, number][]>();
    queries.forEach(([node, k], idx) => {
        if (!queriesByNode.has(node)) queriesByNode.set(node, []);
        queriesByNode.get(node)!.push([k, idx]);
    });

    const results: number[] = Array(queries.length).fill(0);

    const process = (node: number, keep: boolean): void => {
        for (const child of treeChildren[node]) {
            if (child !== heavyChild[node]) process(child, false);
        }
        if (heavyChild[node] !== -1) process(heavyChild[node], true);
        addXOR(node);
        for (const child of treeChildren[node]) {
            if (child !== heavyChild[node]) addSubtree(child);
        }

        if (queriesByNode.has(node)) {
            for (const [k, idx] of queriesByNode.get(node)!) {
                if (k > segTree[0]) {
                    results[idx] = -1;
                } else {
                    const kthIdx = findKthSmallest(k);
                    results[idx] = uniqueXOR[kthIdx];
                }
            }
        }

        if (!keep) {
            removeXOR(node);
            for (const child of treeChildren[node]) removeSubtree(child);
        }
    };

    process(0, false);

    return results;
};