# BFS Suspicious Reachability + Cross-Edge Check | 18 Lines | O(n + m) | 341ms

# Intuition
Mark all methods reachable from `k` as suspicious via BFS. Then check if any edge goes from a non-suspicious method into the suspicious group — if so, we can't safely remove them and return all methods unchanged.

# Approach
- Build an adjacency list from `invocations`.
- BFS from `k`, marking all reachable methods as `suspicious`.
- Check all edges: if any edge `[a, b]` has `b` suspicious but `a` not suspicious, the suspicious group has an external caller — return all `n` methods.
- Otherwise, return all methods not in the suspicious group.

# Complexity
- Time complexity: $$O(n + m)$$ — BFS visits each node and edge once; the cross-edge check scans all edges once.

- Space complexity: $$O(n + m)$$ — adjacency list and BFS queue.

# Code
```typescript []
const remainingMethods = (n: number, k: number, invocations: number[][]): number[] => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of invocations) adj[a].push(b);

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

    const canRemove = invocations.every(([a, b]) => !(suspicious[b] && !suspicious[a]));

    return canRemove
        ? Array.from({ length: n }, (_, i) => i).filter(i => !suspicious[i])
        : Array.from({ length: n }, (_, i) => i);
};
```