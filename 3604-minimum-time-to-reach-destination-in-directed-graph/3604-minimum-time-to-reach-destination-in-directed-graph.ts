function minTime(n: number, edges: number[][]): number {
    // Build adjacency list
    const adj: [number, number, number][][] = new Array(n).fill(0).map(() => []);
    for (const [u, v, start, end] of edges) {
        adj[u].push([v, start, end]);
    }

    // Min-heap based on time. Each element is [time, node]
    const heap: [number, number][] = [];
    heap.push([0, 0]);

    // To keep track of the earliest time to reach each node
    const dist: number[] = new Array(n).fill(Infinity);
    dist[0] = 0;

    while (heap.length > 0) {
        heap.sort((a, b) => a[0] - b[0]); // Simulating a priority queue (min-heap)
        const [currentTime, u] = heap.shift()!;

        if (u === n - 1) {
            return currentTime;
        }

        if (currentTime > dist[u]) {
            continue;
        }

        for (const [v, start, end] of adj[u]) {
            let newTime: number;
            if (currentTime <= end) {
                if (currentTime >= start) {
                    newTime = currentTime + 1;
                } else {
                    newTime = start + 1;
                }
                if (newTime < dist[v]) {
                    dist[v] = newTime;
                    heap.push([newTime, v]);
                }
            }
        }
    }

    return dist[n - 1] === Infinity ? -1 : dist[n - 1];
}