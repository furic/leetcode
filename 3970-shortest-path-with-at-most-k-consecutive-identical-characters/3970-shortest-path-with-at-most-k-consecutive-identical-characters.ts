const shortestPath = (n: number, edges: number[][], labels: string, k: number): number => {
    const edgeCount = edges.length;

    // Adjacency list as linked arrays: firstEdge[node] -> nextEdge[e] -> ...
    const firstEdge = new Int32Array(n).fill(-1);
    const edgeTarget = new Int32Array(edgeCount);
    const edgeWeight = new Int32Array(edgeCount);
    const nextEdge = new Int32Array(edgeCount);
    for (let i = 0; i < edgeCount; i++) {
        const [from, target, cost] = edges[i];
        edgeTarget[i] = target;
        edgeWeight[i] = cost;
        nextEdge[i] = firstEdge[from];
        firstEdge[from] = i;
    }

    const labelCodes = new Uint16Array(n);
    for (let i = 0; i < n; i++) labelCodes[i] = labels.charCodeAt(i);

    // State = (node, current run length of identical labels), packed as node * stride + runLength
    const stride = k + 1;
    const bestDistance = new Float64Array(n * stride).fill(Infinity);

    // Binary min-heap keyed by distance, stored as two parallel typed arrays
    const heapCapacity = edgeCount * k + 1;
    const heapDistance = new Float64Array(heapCapacity);
    const heapState = new Int32Array(heapCapacity);
    let heapSize = 0;

    const startState = 1; // node 0, run length 1
    bestDistance[startState] = 0;
    heapDistance[heapSize] = 0;
    heapState[heapSize++] = startState;

    while (heapSize > 0) {
        // Pop the minimum, then sift the last element down from the root
        const currentDistance = heapDistance[0];
        const state = heapState[0];
        const lastIdx = --heapSize;
        if (lastIdx > 0) {
            const lastDistance = heapDistance[lastIdx];
            const lastState = heapState[lastIdx];
            let index = 0;
            while (true) {
                const leftChild = index * 2 + 1;
                if (leftChild >= heapSize) break;
                let child = leftChild;
                const rightChild = leftChild + 1;
                if (rightChild < heapSize && heapDistance[rightChild] < heapDistance[leftChild]) child = rightChild;
                if (heapDistance[child] >= lastDistance) break;
                heapDistance[index] = heapDistance[child];
                heapState[index] = heapState[child];
                index = child;
            }
            heapDistance[index] = lastDistance;
            heapState[index] = lastState;
        }

        if (currentDistance !== bestDistance[state]) continue; // stale heap entry

        const node = (state / stride) | 0;
        const runLength = state - node * stride;
        if (node === n - 1) return currentDistance;

        for (let edge = firstEdge[node]; edge !== -1; edge = nextEdge[edge]) {
            const target = edgeTarget[edge];
            const nextRun = labelCodes[node] === labelCodes[target] ? runLength + 1 : 1;
            if (nextRun > k) continue;

            const nextState = target * stride + nextRun;
            const nextDistance = currentDistance + edgeWeight[edge];
            if (nextDistance < bestDistance[nextState]) {
                bestDistance[nextState] = nextDistance;

                // Push: sift the new entry up from the bottom
                let index = heapSize++;
                while (index > 0) {
                    const parent = (index - 1) >> 1;
                    if (heapDistance[parent] <= nextDistance) break;
                    heapDistance[index] = heapDistance[parent];
                    heapState[index] = heapState[parent];
                    index = parent;
                }
                heapDistance[index] = nextDistance;
                heapState[index] = nextState;
            }
        }
    }

    return -1;
};