# Union-Find Component Frequency Match | 28 Lines | O(n α(n)) | 87ms

# Intuition
Indices connected by allowed swaps form components — within each component, elements can be freely rearranged. The minimum Hamming distance is the number of `target[i]` values that can't be matched by any `source[j]` in the same component.

# Approach
- **Union-Find:** Build connected components from `allowedSwaps` using union by rank with path compression.
- **Source frequency per component:** For each index `i`, group `source[i]` by its root component into a `Map<root, Map<value, count>>`.
- **Greedy matching:** For each index `i`, look up `target[i]` in the frequency map of `i`'s component:
  - If available (count > 0), consume one occurrence — this position is matched.
  - Otherwise, increment `mismatches`.
- The order of iteration doesn't matter — we're just checking if each target value has a corresponding source value available in the same component pool.

# Complexity
- Time complexity: $$O(n \alpha(n))$$ — union-find operations dominate; map lookups are O(1) average.

- Space complexity: $$O(n)$$ — union-find arrays and frequency maps.

# Code
```typescript []
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
```