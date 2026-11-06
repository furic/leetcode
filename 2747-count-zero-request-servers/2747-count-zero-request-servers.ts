function countServers(n: number, logs: number[][], x: number, queries: number[]): number[] {
    logs.sort(([, a], [, b]) => a - b);  // by time
    logs.push([0, Infinity]);  // sentinel: no window ever reaches it
    const cnt = new Int32Array(n + 1);  // requests per server inside the window [q - x, q]
    const ans: number[] = new Array(queries.length);
    let busy = 0, lo = 0, hi = 0;  // servers with at least one request in it
    for (const [i, q] of [...queries.entries()].sort(([, a], [, b]) => a - b)) {  // queries in time order, with positions
        for (; logs[hi][1] <= q; hi++)  // requests up to q come in
            if (cnt[logs[hi][0]]++ === 0) busy++;
        for (; logs[lo][1] < q - x; lo++)  // requests before q - x go out
            if (--cnt[logs[lo][0]] === 0) busy--;
        ans[i] = n - busy;
    }
    return ans;
}