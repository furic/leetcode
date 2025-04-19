const treeQueries = (n: number, edges: number[][], queries: number[][]): number[] => {
    class FenwickTree {
        tree: number[];
        constructor(public size: number) {
            this.tree = Array(size + 2).fill(0);
        }

        update(index: number, delta: number) {
            while (index <= this.size) {
                this.tree[index] += delta;
                index += index & -index;
            }
        }

        query(index: number): number {
            let res = 0;
            while (index > 0) {
                res += this.tree[index];
                index -= index & -index;
            }
            return res;
        }

        rangeUpdate(l: number, r: number, delta: number) {
            this.update(l, delta);
            this.update(r + 1, -delta);
        }
    }

    const tree = new Map<number, [number, number][]>();
    for (let i = 1; i <= n; i++) tree.set(i, []);
    for (const [u, v, w] of edges) {
        tree.get(u)!.push([v, w]);
        tree.get(v)!.push([u, w]);
    }

    const flatIndex = new Array(n + 1).fill(0);
    const subtreeEnd = new Array(n + 1).fill(0);
    const distance = new Array(n + 1).fill(0);
    const parent = new Array(n + 1).fill(0);
    const edgeWeights = new Map<string, number>();

    let time = 1;

    const dfs = (node: number, par: number, dist: number) => {
        flatIndex[node] = time++;
        distance[node] = dist;
        parent[node] = par;

        for (const [child, weight] of tree.get(node)!) {
            if (child !== par) {
                const key = `${Math.min(node, child)},${Math.max(node, child)}`;
                edgeWeights.set(key, weight);
                dfs(child, node, dist + weight);
            }
        }

        subtreeEnd[node] = time - 1;
    };

    dfs(1, 0, 0);

    const fenwick = new FenwickTree(n);
    const result: number[] = [];

    for (const q of queries) {
        if (q[0] === 1) {
            const [_, u, v, newW] = q;
            const child = parent[u] === v ? u : v;
            const key = `${Math.min(u, v)},${Math.max(u, v)}`;
            const oldW = edgeWeights.get(key)!;
            const delta = newW - oldW;
            fenwick.rangeUpdate(flatIndex[child], subtreeEnd[child], delta);
            edgeWeights.set(key, newW);
        } else {
            const x = q[1];
            const pathSum = distance[x] + fenwick.query(flatIndex[x]);
            result.push(pathSum);
        }
    }

    return result;
}