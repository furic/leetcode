const minTime = (n: number, edges: number[][], k: number): number => {
    if (k === 1) {
        return 0;
    }
    if (n === 0) {
        return 0;
    }

    edges.sort((a, b) => a[2] - b[2]);

    let left = 0;
    let right = edges.length > 0 ? edges[edges.length - 1][2] : 0;

    const find = (parents: number[], i: number): number => {
        if (parents[i] !== i) {
            parents[i] = find(parents, parents[i]);
        }
        return parents[i];
    };

    const union = (parents: number[], ranks: number[], x: number, y: number): boolean => {
        const rootX = find(parents, x);
        const rootY = find(parents, y);
        if (rootX === rootY) {
            return false;
        }
        if (ranks[rootX] > ranks[rootY]) {
            parents[rootY] = rootX;
        } else if (ranks[rootX] < ranks[rootY]) {
            parents[rootX] = rootY;
        } else {
            parents[rootY] = rootX;
            ranks[rootX]++;
        }
        return true;
    };

    let result = right;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const parents = Array.from({ length: n }, (_, i) => i);
        const ranks = new Array(n).fill(0);
        let components = n;

        for (const [u, v, time] of edges) {
            if (time > mid) {
                if (find(parents, u) !== find(parents, v)) {
                    union(parents, ranks, u, v);
                    components--;
                }
            }
        }

        if (components >= k) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}