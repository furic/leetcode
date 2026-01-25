function specialNodes(n: number, edges: number[][], x: number, y: number, z: number): number {
    const adj:number[][] = Array.from({ length: n }, () => []);
    for(const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const getDistances = (startNode: number): number[] => {
        const dists = new Int32Array(n).fill(-1);
        dists[startNode] = 0;
        const queue: number[] = [startNode];
        let head = 0;

        while(head < queue.length) {
            const u = queue[head++];
            const d = dists[u];

            for(const v of adj[u]) {
                if(dists[v] === -1) {
                    dists[v] = d + 1;
                    queue.push(v);
                }
            }
        }
        return dists as unknown as number[];
    };

    const distX = getDistances(x);
    const distY = getDistances(y);
    const distZ = getDistances(z);

    let count = 0;

    for(let i = 0; i < n; i++) {
        const d1 = distX[i];
        const d2 = distY[i];
        const d3 = distZ[i];

        let a, b, c;
        if(d1 <= d2 && d1 <= d3) {
            a = d1;
            if(d2 <= d3) {
                b = d2;
                c = d3;
            } else {
                b = d3;
                c = d2;
            }
        } else if(d2 <= d1 && d2 <= d3) {
            a = d2;
            if(d1 <= d3) {
                b = d1;
                c = d3;
            } else {
                b = d3;
                c = d1;
            }
        }else {
            a = d3;
            if(d1 <= d2) {
                b = d1;
                c = d2;
            } else {
                b = d2;
                c = d1;
            }
        }

        if(a * a + b * b === c * c) {
            count++;
        }
    }

    return count;
};