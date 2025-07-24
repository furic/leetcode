function minimumScore(nums: number[], edges: number[][]): number {
    const n = nums.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const sum = new Array(n).fill(0);
    const in_ = new Array(n).fill(0);
    const out = new Array(n).fill(0);
    let cnt = 0;

    function dfs(x, fa) {
        in_[x] = cnt++;
        sum[x] = nums[x];
        for (const y of adj[x]) {
            if (y === fa) {
                continue;
            }
            dfs(y, x);
            sum[x] ^= sum[y];
        }
        out[x] = cnt;
    }

    dfs(0, -1);

    let res = Infinity;
    for (let u = 1; u < n; u++) {
        for (let v = u + 1; v < n; v++) {
            if (in_[v] > in_[u] && in_[v] < out[u]) {
                res = Math.min(
                    res,
                    calc(sum[0] ^ sum[u], sum[u] ^ sum[v], sum[v]),
                );
            } else if (in_[u] > in_[v] && in_[u] < out[v]) {
                res = Math.min(
                    res,
                    calc(sum[0] ^ sum[v], sum[v] ^ sum[u], sum[u]),
                );
            } else {
                res = Math.min(
                    res,
                    calc(sum[0] ^ sum[u] ^ sum[v], sum[u], sum[v]),
                );
            }
        }
    }
    return res;
}

function calc(part1, part2, part3) {
    return (
        Math.max(part1, Math.max(part2, part3)) -
        Math.min(part1, Math.min(part2, part3))
    );
}