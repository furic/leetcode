const remainingMethods = (n: number, k: number, invocations: number[][]): number[] => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of invocations) adj[a].push(b);

    // BFS to mark all methods reachable from k as suspicious
    const suspicious = new Uint8Array(n);
    const queue = new Int32Array(n);
    let head = 0, tail = 0;

    suspicious[k] = 1;
    queue[tail++] = k;

    while (head < tail) {
        const u = queue[head++];
        for (const v of adj[u])
            if (!suspicious[v]) { suspicious[v] = 1; queue[tail++] = v; }
    }

    // Check if any non-suspicious method invokes a suspicious one
    const canRemove = invocations.every(([a, b]) => !(suspicious[b] && !suspicious[a]));

    return canRemove
        ? Array.from({ length: n }, (_, i) => i).filter(i => !suspicious[i])
        : Array.from({ length: n }, (_, i) => i);
};