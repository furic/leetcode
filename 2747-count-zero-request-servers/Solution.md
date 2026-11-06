# Offline Queries + Sliding Window Server Count | 22 Lines | O((L + Q) log(L + Q)) | 89ms

# Intuition
Answering each query independently would rescan the logs every time. If we sort the queries by time instead, the window `[query - x, query]` only ever moves forward, so a sliding window over time-sorted logs can maintain how many distinct servers are active, and each query's answer is `n - activeServers`.

# Approach
- Sort `logs` by time, and sort the query indices by query time so each answer can be written back to its original position.
- Keep `requestCount[id]` (requests from server `id` inside the window) and `activeServers` (number of servers with a non-zero count).
- For each query in increasing time order:
  - **Expand the right edge:** add every log with `time <= queryTime`. When a server's count goes from `0` to `1`, increment `activeServers`.
  - **Shrink the left edge:** remove every log with `time < queryTime - x`. When a server's count drops to `0`, decrement `activeServers`.
  - Store `n - activeServers` at the query's original index.
- The left edge pointer never passes the right edge pointer, so only logs already added are ever removed.
- Both pointers only move forward, so each log is added once and removed at most once.

# Complexity
- Time complexity: $$O((L + Q) \log (L + Q))$$ where $$L$$ is the number of logs and $$Q$$ the number of queries — dominated by the two sorts; the sliding window itself is $$O(L + Q)$$.

- Space complexity: $$O(n + Q)$$ — the request counts, the query order, and the result array.

# Code
```typescript []
const countServers = (n: number, logs: number[][], x: number, queries: number[]): number[] => {
    logs.sort((a, b) => a[1] - b[1]);

    const queryCount = queries.length;
    const queryOrder: number[] = Array.from({ length: queryCount }, (_, i) => i);
    queryOrder.sort((i, j) => queries[i] - queries[j]);

    const result: number[] = new Array(queryCount).fill(0);

    const requestCount: number[] = new Array(n + 1).fill(0);
    let windowEnd = 0;
    let windowStart = 0;
    let activeServers = 0;

    for (const qi of queryOrder) {
        const queryTime = queries[qi];

        while (windowEnd < logs.length && logs[windowEnd][1] <= queryTime) {
            if (requestCount[logs[windowEnd++][0]]++ === 0) activeServers++;
        }

        while (windowStart < windowEnd && logs[windowStart][1] < queryTime - x) {
            if (--requestCount[logs[windowStart++][0]] === 0) activeServers--;
        }

        result[qi] = n - activeServers;
    }

    return result;
};
```