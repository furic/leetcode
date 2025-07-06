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