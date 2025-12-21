const interactionCosts = (
    n: number,
    edges: number[][],
    group: number[]
): number => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const totalCount = new Uint32Array(21);
    for (let i = 0; i < n; i++) totalCount[group[i]]++;

    const parent = new Int32Array(n).fill(-1);
    const order = new Uint32Array(n);
    const queue = new Uint32Array(n);
    const visited = new Uint8Array(n);

    visited[0] = 1;
    let head = 0,
        tail = 1,
        idx = 0;
    queue[0] = 0;

    while (head < tail) {
        const u = queue[head++];
        order[idx++] = u;
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                parent[v] = u;
                queue[tail++] = v;
            }
        }
    }

    let result = 0;
    const subtreeCount = new Uint32Array(n * 21);

    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        const uBase = u * 21;
        subtreeCount[uBase + group[u]] = 1;

        for (const v of adj[u]) {
            if (parent[v] === u) {
                const vBase = v * 21;
                for (let g = 1; g <= 20; g++) {
                    const c = subtreeCount[vBase + g];
                    result += c * (totalCount[g] - c);
                }
                for (let g = 1; g <= 20; g++) {
                    subtreeCount[uBase + g] += subtreeCount[vBase + g];
                }
            }
        }
    }

    return result;
};
