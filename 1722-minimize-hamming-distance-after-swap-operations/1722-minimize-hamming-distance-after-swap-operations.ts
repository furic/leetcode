class UnionFind {
    private readonly parent: number[];
    private readonly rank: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank   = new Array(n).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }

    union(x: number, y: number): void {
        x = this.find(x);
        y = this.find(y);
        if (x === y) return;
        if (this.rank[x] < this.rank[y]) [x, y] = [y, x];
        this.parent[y] = x;
        if (this.rank[x] === this.rank[y]) this.rank[x]++;
    }
}

const minimumHammingDistance = (
    source: number[],
    target: number[],
    allowedSwaps: number[][],
): number => {
    const n = source.length;
    const uf = new UnionFind(n);

    for (const [a, b] of allowedSwaps) uf.union(a, b);

    // Group source values by their connected component
    const componentFreq = new Map<number, Map<number, number>>();
    for (let i = 0; i < n; i++) {
        const root = uf.find(i);
        if (!componentFreq.has(root)) componentFreq.set(root, new Map());
        const freq = componentFreq.get(root)!;
        freq.set(source[i], (freq.get(source[i]) ?? 0) + 1);
    }

    // For each target value, consume a matching source value from the same component
    let mismatches = 0;
    for (let i = 0; i < n; i++) {
        const freq = componentFreq.get(uf.find(i))!;
        const count = freq.get(target[i]) ?? 0;
        if (count > 0) freq.set(target[i], count - 1);
        else mismatches++;
    }

    return mismatches;
};