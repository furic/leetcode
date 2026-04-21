const createUnionFind = (n: number) => {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank   = new Array(n).fill(0);

    const find = (x: number): number => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };

    const union = (x: number, y: number): void => {
        x = find(x); y = find(y);
        if (x === y) return;
        if (rank[x] < rank[y]) [x, y] = [y, x];
        parent[y] = x;
        if (rank[x] === rank[y]) rank[x]++;
    };

    return { find, union };
};

const minimumHammingDistance = (
    source: number[],
    target: number[],
    allowedSwaps: number[][],
): number => {
    const n = source.length;
    const { find, union } = createUnionFind(n);

    for (const [a, b] of allowedSwaps) union(a, b);

    const componentFreq = new Map<number, Map<number, number>>();
    for (let i = 0; i < n; i++) {
        const root = find(i);
        if (!componentFreq.has(root)) componentFreq.set(root, new Map());
        const freq = componentFreq.get(root)!;
        freq.set(source[i], (freq.get(source[i]) ?? 0) + 1);
    }

    let mismatches = 0;
    for (let i = 0; i < n; i++) {
        const freq = componentFreq.get(find(i))!;
        const count = freq.get(target[i]) ?? 0;
        if (count > 0) freq.set(target[i], count - 1);
        else mismatches++;
    }

    return mismatches;
};