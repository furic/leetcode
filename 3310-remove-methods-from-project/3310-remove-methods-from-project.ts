function remainingMethods(n: number, k: number, invocations: number[][]): number[] {
    const adj: number[][] = Array.from(
        { length: n },
        () => []
    );

    for (const [u, v] of invocations) {
        adj[u].push(v);
    }

    const suspicious: boolean[] = Array(n).fill(false);
    suspicious[k] = true;

    const queue: number[] = [k];
    let head = 0;

    while (head < queue.length) {
        const u = queue[head++];

        for (const v of adj[u]) {
            if (!suspicious[v]) {
                suspicious[v] = true;
                queue.push(v);
            }
        }
    }

    for (const [u, v] of invocations) {
        if (!suspicious[u] && suspicious[v]) {
            return Array.from(
                { length: n },
                (_, i) => i
            );
        }
    }

    const result: number[] = [];

    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) {
            result.push(i);
        }
    }

    return result;
};