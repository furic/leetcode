const countServers = (n: number, logs: number[][], x: number, queries: number[]): number[] => {
    logs.sort((a, b) => a[1] - b[1]);

    // Process queries in increasing time order, remembering each one's original position
    const queryCount = queries.length;
    const queryOrder: number[] = Array.from({ length: queryCount }, (_, i) => i);
    queryOrder.sort((i, j) => queries[i] - queries[j]);

    const result: number[] = new Array(queryCount).fill(0);

    // requestCount[id] = requests from server id inside the current window
    const requestCount: number[] = new Array(n + 1).fill(0);
    let windowEnd = 0;   // next log to add (time <= query)
    let windowStart = 0; // next log to drop (time < query - x)
    let activeServers = 0;

    for (const qi of queryOrder) {
        const queryTime = queries[qi];

        // Slide the right edge forward: add logs up to queryTime
        while (windowEnd < logs.length && logs[windowEnd][1] <= queryTime) {
            if (requestCount[logs[windowEnd++][0]]++ === 0) activeServers++;
        }

        // Slide the left edge forward: drop logs before queryTime - x
        while (windowStart < windowEnd && logs[windowStart][1] < queryTime - x) {
            if (--requestCount[logs[windowStart++][0]] === 0) activeServers--;
        }

        result[qi] = n - activeServers;
    }

    return result;
};