function minTime(n: number, edges: number[][]): number {
    const graph: Array<Array<[number, number, number]>> = [];
    for (let i = 0; i < n; i++) {
        graph.push([]);
    }

    for (const [u, v, start, end] of edges) {
        graph[u].push([v, start, end]);
    }

    const earliestArrival = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    earliestArrival[0] = 0;

    const pq: Array<[number, number]> = [[0, 0]]; // [time, node]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currTime, node] = pq.shift()!;

        if (currTime > earliestArrival[node]) continue;
        if (node === n - 1) return currTime;

        for (const [nextNode, startTime, endTime] of graph[node]) {
            if (currTime > endTime) continue;
            const departureTime = currTime < startTime ? startTime : currTime;
            const arrivalTime = departureTime + 1;
            if (arrivalTime < earliestArrival[nextNode]) {
                earliestArrival[nextNode] = arrivalTime;
                pq.push([arrivalTime, nextNode]);
            }
        }
    }

    return -1;
}