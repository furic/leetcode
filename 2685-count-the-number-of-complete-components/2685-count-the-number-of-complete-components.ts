function countCompleteComponents(n: number, edges: number[][]): number {
    const adj: number[][] = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const visited: boolean[] = Array(n).fill(false);

    const bfs = (start: number): boolean => {
        const queue: number[] = [start];
        let head = 0;

        visited[start] = true;

        let nodes = 0;
        let edgeCount = 0;

        while (head < queue.length) {
            const curr = queue[head++];

            nodes++;
            edgeCount += adj[curr].length;

            for (const nei of adj[curr]) {
                if (visited[nei]) {
                    continue;
                }

                visited[nei] = true;
                queue.push(nei);
            }
        }

        edgeCount = Math.floor(edgeCount / 2);

        return edgeCount === nodes * (nodes - 1) / 2;
    };

    let res = 0;

    for (let i = 0; i < n; i++) {
        if (!visited[i] && bfs(i)) {
            res++;
        }
    }

    return res;
}