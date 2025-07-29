class DisjointSetUnion {
    parent: number[];

    constructor(size: number) {
        this.parent = Array(size + 1);
        for (let id = 1; id <= size; id++) this.parent[id] = id;
    }

    find = (node: number): number =>
        this.parent[node] === node ? node : (this.parent[node] = this.find(this.parent[node]));

    union = (a: number, b: number): void => {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA !== rootB) this.parent[rootB] = rootA;
    };
}

const processQueries = (
    c: number,
    connections: number[][],
    queries: number[][]
): number[] => {
    const dsu = new DisjointSetUnion(c);
    connections.forEach(([u, v]) => dsu.union(u, v));

    const gridMembers: number[][] = Array.from({ length: c + 1 }, () => []);
    for (let station = 1; station <= c; station++) {
        gridMembers[dsu.find(station)].push(station);
    }

    const gridPointers: number[] = Array(c + 1).fill(0);
    const isOnline: boolean[] = Array(c + 1).fill(true);

    const result: number[] = [];

    queries.forEach(([queryType, stationId]) => {
        if (queryType === 2) {
            if (!isOnline[stationId]) return;
            isOnline[stationId] = false;
            const gridRoot = dsu.find(stationId);
            while (
                gridPointers[gridRoot] < gridMembers[gridRoot].length &&
                !isOnline[gridMembers[gridRoot][gridPointers[gridRoot]]]
            ) {
                gridPointers[gridRoot]++;
            }
        } else {
            if (isOnline[stationId]) {
                result.push(stationId);
            } else {
                const gridRoot = dsu.find(stationId);
                const pointer = gridPointers[gridRoot];
                result.push(
                    pointer < gridMembers[gridRoot].length
                        ? gridMembers[gridRoot][pointer]
                        : -1
                );
            }
        }
    });

    return result;
};