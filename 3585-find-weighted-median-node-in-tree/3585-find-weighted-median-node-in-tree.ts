const findMedian = (n: number, edges: number[][], queries: number[][]): number[] => {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    const parent0: number[] = Array(n).fill(-1);
    const depth: number[] = Array(n).fill(0);
    const dist0: number[] = Array(n).fill(0);
    const children: number[][] = Array.from({ length: n }, () => []);
    
    const stack: number[] = [0];
    const visited: boolean[] = Array(n).fill(false);
    visited[0] = true;
    while (stack.length) {
        const u = stack.pop()!;
        for (const [v, w] of graph[u]) {
            if (visited[v]) continue;
            visited[v] = true;
            depth[v] = depth[u] + 1;
            dist0[v] = dist0[u] + w;
            parent0[v] = u;
            children[u].push(v);
            stack.push(v);
        }
    }

    const LOG = Math.ceil(Math.log2(n));
    const parent: number[][] = Array.from({ length: LOG + 1 }, () => Array(n).fill(-1));
    parent[0] = parent0;
    for (let i = 1; i <= LOG; i++) {
        for (let j = 0; j < n; j++) {
            const p = parent[i-1][j];
            parent[i][j] = p === -1 ? -1 : parent[i-1][p];
        }
    }

    const lca = (a: number, b: number): number => {
        if (depth[a] < depth[b]) [a, b] = [b, a];
        let depthDiff = depth[a] - depth[b];
        for (let i = LOG; i >= 0; i--) {
            if (depthDiff >= (1 << i)) {
                a = parent[i][a];
                depthDiff -= (1 << i);
            }
        }
        if (a === b) return a;
        for (let i = LOG; i >= 0; i--) {
            if (parent[i][a] !== parent[i][b]) {
                a = parent[i][a];
                b = parent[i][b];
            }
        }
        return parent[0][a];
    };

    const ans: number[] = [];
    for (const [u, v] of queries) {
        const l = lca(u, v);
        const total = dist0[u] + dist0[v] - 2 * dist0[l];
        const A = dist0[u] - dist0[l];
        if (2 * A >= total) {
            const target = dist0[u] - total / 2;
            let x = u;
            for (let i = LOG; i >= 0; i--) {
                const y = parent[i][x];
                if (y === -1) continue;
                if (depth[y] < depth[l]) continue;
                if (dist0[y] > target) {
                    x = y;
                }
            }
            if (dist0[u] - dist0[x] >= total / 2) {
                ans.push(x);
            } else {
                ans.push(parent[0][x]);
            }
        } else {
            const rem = total / 2 - A;
            const rem2 = dist0[l] + rem;
            let candidate = v;
            for (let i = LOG; i >= 0; i--) {
                const z = parent[i][candidate];
                if (z === -1) continue;
                if (depth[z] < depth[l]) continue;
                if (dist0[z] >= rem2) {
                    candidate = z;
                }
            }
            ans.push(candidate);
        }
    }
    return ans;
};