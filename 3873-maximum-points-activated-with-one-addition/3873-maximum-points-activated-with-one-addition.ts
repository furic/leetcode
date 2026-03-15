const maxActivated = (points: number[][]): number => {
    const n = points.length;
    const parent = new Int32Array(n).map((_, i) => i);

    const find = (i: number): number => {
        while (parent[i] !== i) {
            parent[i] = parent[parent[i]]; // Path compression (halving)
            i = parent[i];
        }
        return i;
    };

    const union = (i: number, j: number): void => {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) parent[rootI] = rootJ;
    };

    // Union points that share an x or y coordinate into the same component
    const xGroup = new Map<number, number>();
    const yGroup = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        const [x, y] = points[i];
        if (xGroup.has(x)) union(i, xGroup.get(x)!); else xGroup.set(x, i);
        if (yGroup.has(y)) union(i, yGroup.get(y)!); else yGroup.set(y, i);
    }

    // Count component sizes
    const componentSize = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        const root = find(i);
        componentSize.set(root, (componentSize.get(root) ?? 0) + 1);
    }

    // Adding one point can bridge at most two components (via its x and y coordinates).
    // Best case: pick the two largest components + 1 for the added point itself.
    const sizes = Array.from(componentSize.values()).sort((a, b) => b - a);
    return sizes.length === 1 ? sizes[0] + 1 : sizes[0] + sizes[1] + 1;
};