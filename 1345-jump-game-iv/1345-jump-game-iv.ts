function minJumps(arr: number[]): number {
    const n = arr.length;
    if (n === 1)
        return 0;
    const graph = new Map();
    for (let i = 0; i < n; i++) {
        if (!graph.has(arr[i])) {
            graph.set(arr[i], []);
        }
        graph.get(arr[i]).push(i);
    }
    const q = [0];
    const visited = new Array(n).fill(false);
    visited[0] = true;
    let head = 0;
    let cnt = 0;
    while (head < q.length) {
        let size = q.length - head;
        while (size--) {
            const idx = q[head++];
            if (idx === n - 1)
                return cnt;
            if (idx - 1 >= 0 && !visited[idx - 1]) {
                visited[idx - 1] = true;
                q.push(idx - 1);
            }
            if (idx + 1 < n && !visited[idx + 1]) {
                visited[idx + 1] = true;
                q.push(idx + 1);
            }
            if (graph.has(arr[idx])) {
                for (const nxt of graph.get(arr[idx])) {
                    if (!visited[nxt]) {
                        visited[nxt] = true;
                        q.push(nxt)
                    }
                }
                graph.delete(arr[idx]);
            }
        }
        cnt++;
    }
    return -1;
};