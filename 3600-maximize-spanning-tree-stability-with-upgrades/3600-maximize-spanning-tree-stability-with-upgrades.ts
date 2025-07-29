const maxStability = (n: number, edges: number[][], k: number): number => {
    const parent: number[] = Array(n).fill(-1);

    const find = (i: number): number => parent[i] < 0 ? i : parent[i] = find(parent[i]);

    const optionalEdges: [number, number, number][] = [];
    let edgesUsed = 0;
    let minMandatoryStrength = 2e5;
    let minWithSingleUpgrade = 2e5;
    let maxOptionalEdgeStrength = 1e5;

    // Process mandatory edges first
    for (const [u, v, strength, must] of edges) {
        if (must === 1) {
            const rootU = find(u);
            const rootV = find(v);
            if (rootU === rootV) return -1; // cycle formed, invalid
            parent[rootV] = rootU;
            edgesUsed++;
            minMandatoryStrength = Math.min(minMandatoryStrength, strength);
        } else {
            optionalEdges.push([strength, v, u]);
        }
    }

    // Sort optional edges by descending strength
    optionalEdges.sort((a, b) => b[0] - a[0]);

    for (const [strength, u, v] of optionalEdges) {
        const rootU = find(u);
        const rootV = find(v);
        if (rootU !== rootV) {
            parent[rootV] = rootU;
            edgesUsed++;
            if (edgesUsed === n - 1 - k) {
                minWithSingleUpgrade = strength;
            }
            maxOptionalEdgeStrength = strength;
        }
    }

    return edgesUsed === n - 1 
        ? Math.min(
            minMandatoryStrength,
            minWithSingleUpgrade,
            maxOptionalEdgeStrength * (k > 0 ? 2 : 1)
        )
        : -1;
};