function minJumps(nums: number[]): number {
    const n: number = nums.length;
    if (n <= 1) 
        return 0;

    const port: Map<number, number[]> = new Map();

    for (let i = 0; i < n; i++) {
        let tmp: number = nums[i];
        for (let d = 2; d * d <= tmp; d++) {
            if (tmp % d === 0) {
                if (!port.has(d)) 
                    port.set(d, []);
                port.get(d)!.push(i);
                while (tmp % d === 0) 
                    tmp /= d;
            }
        }
        if (tmp > 1) {
            if (!port.has(tmp)) port.set(tmp, []);
            port.get(tmp)!.push(i);
        }
    }

    const visited: Uint8Array = new Uint8Array(n);
    const q: Int32Array = new Int32Array(n);
    let head: number = 0;
    let tail: number = 0;

    q[tail++] = 0;
    visited[0] = 1;
    let steps: number = 0;

    while (head < tail) {
        let sz: number = tail - head;
        while (sz--) {
            const i: number = q[head++];

            if (i === n - 1) 
                return steps;

            const num: number = nums[i];
            if (port.has(num)) {
                const neighbors: number[] = port.get(num)!;
                for (let k = 0; k < neighbors.length; k++) {
                    const nei = neighbors[k];
                    if (!visited[nei]) {
                        visited[nei] = 1;
                        q[tail++] = nei;
                    }
                }
                port.delete(num);
            }
            if (i + 1 < n && !visited[i + 1]) {
                visited[i + 1] = 1;
                q[tail++] = i + 1;
            }

            if (i - 1 >= 0 && !visited[i - 1]) {
                visited[i - 1] = 1;
                q[tail++] = i - 1;
            }
        }
        steps++;
    }

    return steps;
}