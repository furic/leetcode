# Dijkstra on Node + Run-Length States | 74 Lines | O(E·k·log(E·k))

# Intuition
A plain shortest path isn't enough, because whether a step is allowed depends on how many identical labels we have just seen in a row. Put that run length into the state: `(node, runLength)`. The graph is then a normal weighted graph over these states, and Dijkstra finds the cheapest path to node `n - 1` in any run-length state.

# Approach
- **State definition:** `(node, runLength)` means we are at `node` and the last `runLength` labels on the path are identical. `runLength` ranges over `1..k`, and the state is packed into one integer as `node * (k + 1) + runLength`.
- **Start state:** node `0` with `runLength = 1`, at distance `0`.
- **Transitions:** for each edge `node → target`, compute `nextRun`:
  - If `labels[node] === labels[target]`, then `nextRun = runLength + 1`.
  - Otherwise, the run resets and `nextRun = 1`.
  - If `nextRun > k`, the edge is skipped because it would break the constraint.
  - Otherwise, relax `(target, nextRun)` with distance `currentDistance + weight`.
- **Adjacency list:** stored as linked typed arrays (`firstEdge`, `nextEdge`, `edgeTarget`, `edgeWeight`) for cache-friendly iteration with no per-node array allocations.
- **Priority queue:** a hand-written binary min-heap over two parallel typed arrays (`heapDistance`, `heapState`).
  - Push sifts the new entry up from the bottom.
  - Pop takes the root, moves the last element to the root, and sifts it down.
  - Capacity is `edges × k + 1`, which bounds the number of successful relaxations.
- **Stale entries:** when popping, skip any entry whose distance doesn't match `bestDistance[state]`, since a better path to that state was already processed.
- **Termination:** the first time a state with `node === n - 1` is popped, its distance is optimal, so return it. If the heap empties first, return `-1`.

# Complexity
- Time complexity: $$O(E \cdot k \cdot \log(E \cdot k))$$ — there are `n × k` states and at most `E × k` relaxations, and each heap operation costs $$O(\log(E \cdot k))$$.

- Space complexity: $$O((n + E) \cdot k)$$ — the distance table has `n × (k + 1)` entries, and the heap holds up to `E × k + 1` entries.

# Code
```typescript []
const shortestPath = (n: number, edges: number[][], labels: string, k: number): number => {
    const edgeCount = edges.length;

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

    const stride = k + 1;
    const bestDistance = new Float64Array(n * stride).fill(Infinity);

    const heapCapacity = edgeCount * k + 1;
    const heapDistance = new Float64Array(heapCapacity);
    const heapState = new Int32Array(heapCapacity);
    let heapSize = 0;

    const startState = 1;
    bestDistance[startState] = 0;
    heapDistance[heapSize] = 0;
    heapState[heapSize++] = startState;

    while (heapSize > 0) {
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

        if (currentDistance !== bestDistance[state]) continue;

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
```