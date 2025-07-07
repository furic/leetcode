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
        if (!this.valueToIndex.has(val)) {
            return;
        }
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
            if (this.heap[parentIdx] <= this.heap[index]) {
                break;
            }
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
            if (smallest === index) {
                break;
            }
            this.swap(index, smallest);
            index = smallest;
        }
    }

    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
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
        if (rootX === rootY) {
            return;
        }
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
    for (const [u, v] of connections) {
        dsu.union(u, v);
    }

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
            const heap = heaps.get(root);
            if (heap) {
                heap.remove(x);
            }
        }
    }
    return result;
}