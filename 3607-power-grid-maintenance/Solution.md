# [TypeScript] DSU + Pointer Sweep | 56 Lines | O(q + c α(c)) | 260ms

# Intuition
We need to dynamically resolve:
- If a queried station is online, return itself.
- If offline, find the **smallest online station in its grid** efficiently.
Since connectivity is static, **Disjoint Set Union (DSU)** naturally identifies grids. To find the smallest online station efficiently, pre-sort each grid and maintain a **moving pointer per grid** to skip offline stations.

# Approach 1: DSU + Pointer Sweep
- Use **DSU** to identify connected grids.
- For each grid, precompute and sort its members.
- For each grid, maintain a pointer indicating the smallest currently online station in that grid.
- For each query:
  - If `[1, x]`:
    - If `x` is online, return `x`.
    - Else, return `gridMembers[gridRoot][pointer]` or `-1` if none.
  - If `[2, x]`:
    - Mark `x` offline.
    - Advance the pointer in its grid to skip `x` and any subsequent offline stations.

# Complexity
- Time complexity: $$O(q + c \cdot \alpha(c))$$  
  (DSU nearly constant per union/find, each query constant time except pointer sweeps which sum to O(c) total).
- Space complexity: $$O(c)$$

# Code
```typescript
class DisjointSetUnion {
    parent: number[];

    constructor(size: number) {
        this.parent = Array(size + 1);
        for (let id = 1; id <= size; id++) this.parent[id] = id;
    }

    find = (node: number): number =>
        this.parent[node] === node ? node : (this.parent[node] = this.find(this.parent[node]));

    union = (a: number, b: number): void => {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA !== rootB) this.parent[rootB] = rootA;
    };
}

const processQueries = (
    c: number,
    connections: number[][],
    queries: number[][]
): number[] => {
    const dsu = new DisjointSetUnion(c);
    connections.forEach(([u, v]) => dsu.union(u, v));

    const gridMembers: number[][] = Array.from({ length: c + 1 }, () => []);
    for (let station = 1; station <= c; station++) {
        gridMembers[dsu.find(station)].push(station);
    }

    const gridPointers: number[] = Array(c + 1).fill(0);
    const isOnline: boolean[] = Array(c + 1).fill(true);

    const result: number[] = [];

    queries.forEach(([queryType, stationId]) => {
        if (queryType === 2) {
            if (!isOnline[stationId]) return;
            isOnline[stationId] = false;
            const gridRoot = dsu.find(stationId);
            while (
                gridPointers[gridRoot] < gridMembers[gridRoot].length &&
                !isOnline[gridMembers[gridRoot][gridPointers[gridRoot]]]
            ) {
                gridPointers[gridRoot]++;
            }
        } else {
            if (isOnline[stationId]) {
                result.push(stationId);
            } else {
                const gridRoot = dsu.find(stationId);
                const pointer = gridPointers[gridRoot];
                result.push(
                    pointer < gridMembers[gridRoot].length
                        ? gridMembers[gridRoot][pointer]
                        : -1
                );
            }
        }
    });

    return result;
};
```

# Approach 2: DSU + Removable Heap
- **DSU (Disjoint Set Union):** Identify connected components once since connectivity does not change.
- For each grid/component:
  - Maintain a **MinHeapWithRemoval** containing all online station ids.
- For query type:
  - `[1, x]`: If `x` is online, return `x`. Otherwise, return `heap.top()` from its component or `-1` if none.
  - `[2, x]`: Mark `x` offline and remove it from its component heap.

# Complexity
- Time complexity: $$O(q \log c)$$
- Space complexity: $$O(c)$$

# Code
```typescript
class MinHeapWithRemoval {
    private heap: number[];
    private valueToIndex: Map<number, number>;

    constructor() {
        this.heap = [];
        this.valueToIndex = new Map<number, number>();
    }

    push(val: number): void {
        this.heap.push(val);
        this.valueToIndex.set(val, this.heap.length - 1);
        this.bubbleUp(this.heap.length - 1);
    }

    remove(val: number): void {
        if (!this.valueToIndex.has(val)) return;
        const index = this.valueToIndex.get(val)!;
        this.valueToIndex.delete(val);
        if (index === this.heap.length - 1) {
            this.heap.pop();
            return;
        }
        const lastVal = this.heap[this.heap.length - 1];
        this.heap[index] = lastVal;
        this.valueToIndex.set(lastVal, index);
        this.heap.pop();
        const parentIdx = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[index] < this.heap[parentIdx]) {
            this.bubbleUp(index);
        } else {
            this.bubbleDown(index);
        }
    }

    top(): number {
        return this.heap[0];
    }

    size(): number {
        return this.heap.length;
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[index]) break;
            this.swap(index, parentIdx);
            index = parentIdx;
        }
    }

    private bubbleDown(index: number): void {
        const size = this.heap.length;
        while (true) {
            const leftChildIdx = 2 * index + 1;
            const rightChildIdx = 2 * index + 2;
            let smallest = index;
            if (leftChildIdx < size && this.heap[leftChildIdx] < this.heap[smallest]) {
                smallest = leftChildIdx;
            }
            if (rightChildIdx < size && this.heap[rightChildIdx] < this.heap[smallest]) {
                smallest = rightChildIdx;
            }
            if (smallest === index) break;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.valueToIndex.set(this.heap[i], i);
        this.valueToIndex.set(this.heap[j], j);
    }
}

class DSU {
    private parent: number[];
    private rank: number[];

    constructor(n: number) {
        this.parent = new Array(n + 1);
        this.rank = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY) return;
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
}

function processQueries(c: number, connections: number[][], queries: number[][]): number[] {
    const dsu = new DSU(c);
    for (const [u, v] of connections) dsu.union(u, v);

    const online: boolean[] = new Array(c + 1).fill(true);
    const heaps: Map<number, MinHeapWithRemoval> = new Map();

    for (let i = 1; i <= c; i++) {
        const root = dsu.find(i);
        if (!heaps.has(root)) {
            heaps.set(root, new MinHeapWithRemoval());
        }
        heaps.get(root)!.push(i);
    }

    const result: number[] = [];
    for (const [type, x] of queries) {
        if (type === 1) {
            if (online[x]) {
                result.push(x);
            } else {
                const root = dsu.find(x);
                const heap = heaps.get(root);
                if (!heap || heap.size() === 0) {
                    result.push(-1);
                } else {
                    result.push(heap.top());
                }
            }
        } else if (type === 2 && online[x]) {
            online[x] = false;
            const root = dsu.find(x);
            heaps.get(root)?.remove(x);
        }
    }
    return result;
}
```