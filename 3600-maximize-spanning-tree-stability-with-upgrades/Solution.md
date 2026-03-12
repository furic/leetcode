# Max Stability DSU Sort | 52 Lines | O(m log m) | 164ms

# Intuition
We need to find a **spanning tree** with:
- **Mandatory edges included** (cannot upgrade).
- At most **k upgrades** doubling optional edge strengths.
- Maximize the **minimum strength** among all used edges (stability).

This suggests using a **modified Kruskal’s MST**:
- Include mandatory edges first.
- Sort optional edges descendingly to prioritize strong edges.
- Track stability candidates considering upgrade limits.

# Approach 1: Max Stability DSU Sort
1. **Union-Find (DSU)** to build the spanning tree:
   - Include all mandatory edges first; check for cycles.
   - Sort optional edges by strength descendingly.
   - Add optional edges to connect the tree, tracking:
      - Smallest mandatory strength.
      - The strength at the (n - 1 - k)th edge (where upgrades would stop).
      - The largest optional edge strength for potential upgrades.

2. After building the MST:
   - If spanning tree formed (n - 1 edges), calculate:
      - min(
          smallest mandatory strength,
          min strength at (n - 1 - k) edge,
          max optional strength * 2 if upgrades remain
        )
   - Return -1 if spanning tree impossible.

# Complexity
- Time complexity: $$O(m \log m)$$ where m = number of edges (sorting optional edges).
- Space complexity: $$O(n)$$ for DSU parent array.

# Code
```typescript []
const maxStability = (n: number, edges: number[][], k: number): number => {
    const parent: number[] = Array(n).fill(-1);

    const find = (i: number): number => parent[i] < 0 ? i : parent[i] = find(parent[i]);

    const optionalEdges: [number, number, number][] = [];
    let edgesUsed = 0;
    let minMandatoryStrength = 2e5;
    let minWithSingleUpgrade = 2e5;
    let maxOptionalEdgeStrength = 1e5;

    for (const [u, v, strength, must] of edges) {
        if (must === 1) {
            const rootU = find(u);
            const rootV = find(v);
            if (rootU === rootV) return -1;
            parent[rootV] = rootU;
            edgesUsed++;
            minMandatoryStrength = Math.min(minMandatoryStrength, strength);
        } else {
            optionalEdges.push([strength, v, u]);
        }
    }

    optionalEdges.sort((a, b) => b[0] - a[0]);

    for (const [strength, u, v] of optionalEdges) {
        const rootU = find(u);
        const rootV = find(v);
        if (rootU !== rootV) {
            parent[rootV] = rootU;
            edgesUsed++;
            if (edgesUsed === n - 1 - k) {
                minWithSingleUpgrade = strength;
            }
            maxOptionalEdgeStrength = strength;
        }
    }

    return edgesUsed === n - 1 
        ? Math.min(
            minMandatoryStrength,
            minWithSingleUpgrade,
            maxOptionalEdgeStrength * (k > 0 ? 2 : 1)
        )
        : -1;
};
```

# Approach 2: Binary Search MST
1. **Separate mandatory and optional edges.**
2. Check:
   - If mandatory edges form cycles (invalid).
   - If the full graph can be connected (if not, impossible).
3. **Binary search** stability value `x` from 1 to 2e5:
   - Ensure all mandatory edges ≥ x.
   - Greedily add optional edges with strength ≥ x.
   - If still disconnected and have upgrades left (`k`), check if we can connect all components by doubling eligible optional edges with `2 * s >= x`.
4. If feasible at `x`, search higher; else, search lower.
5. Return the highest feasible `x`.

# Complexity
- Time complexity: $$O(m \log m \log W)$$ where m = edges, W = max strength (2e5).
- Space complexity: $$O(n)$$ for Union-Find and component tracking.

# Code
```typescript []
class UnionFind {
    parent: number[];
    rank: number[];
    count: number;

    constructor(n: number) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        let rx = this.find(x);
        let ry = this.find(y);
        if (rx === ry) {
            return false;
        }
        if (this.rank[rx] < this.rank[ry]) {
            this.parent[rx] = ry;
        } else if (this.rank[rx] > this.rank[ry]) {
            this.parent[ry] = rx;
        } else {
            this.parent[ry] = rx;
            this.rank[rx]++;
        }
        this.count--;
        return true;
    }

    getCount(): number {
        return this.count;
    }
}

const maxStability = (n: number, edges: number[][], k: number): number => {
    let must_edges: number[][] = [];
    let optional_edges: number[][] = [];

    for (let edge of edges) {
        if (edge[3] === 1) {
            must_edges.push(edge);
        } else {
            optional_edges.push(edge);
        }
    }

    let uf_must = new UnionFind(n);
    for (let edge of must_edges) {
        let u = edge[0];
        let v = edge[1];
        if (!uf_must.union(u, v)) {
            return -1;
        }
    }

    let uf_all = new UnionFind(n);
    for (let edge of edges) {
        uf_all.union(edge[0], edge[1]);
    }
    if (uf_all.getCount() !== 1) {
        return -1;
    }

    let low = 1;
    let high = 200000;
    let ans = -1;

    const check = (x: number): boolean => {
        for (let edge of must_edges) {
            let s_val = edge[2];
            if (s_val < x) {
                return false;
            }
        }

        let uf = new UnionFind(n);
        for (let edge of must_edges) {
            uf.union(edge[0], edge[1]);
        }

        for (let edge of optional_edges) {
            let s_val = edge[2];
            if (s_val >= x) {
                uf.union(edge[0], edge[1]);
            }
        }

        let comp = uf.getCount();
        if (comp === 1) {
            return true;
        }
        if (comp - 1 > k) {
            return false;
        }

        let comp_index = new Array(n).fill(-1);
        let comp_ids: number[] = [];
        for (let i = 0; i < n; i++) {
            let root = uf.find(i);
            if (comp_index[root] === -1) {
                comp_index[root] = comp_ids.length;
                comp_ids.push(root);
            }
        }

        let comp_uf = new UnionFind(comp);
        for (let edge of optional_edges) {
            let s_val = edge[2];
            if (s_val < x && 2 * s_val >= x) {
                let u = edge[0];
                let v = edge[1];
                let ru = uf.find(u);
                let rv = uf.find(v);
                if (ru !== rv) {
                    let idx1 = comp_index[ru];
                    let idx2 = comp_index[rv];
                    comp_uf.union(idx1, idx2);
                }
            }
        }

        return comp_uf.getCount() === 1;
    };

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (check(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
}
```