const maxActivated = (points: number[][]): number => {
    const parent = new Map<string, string>();
    const rnk = new Map<string, number>();

    const find = (a: string): string => {
        let root = a;
        while (parent.get(root) !== root) root = parent.get(root)!;
        while (parent.get(a) !== root) {
            const next = parent.get(a)!;
            parent.set(a, root);
            a = next;
        }
        return root;
    };

    const makeSet = (a: string): void => {
        if (!parent.has(a)) {
            parent.set(a, a);
            rnk.set(a, 0);
        }
    };

    const union = (a: string, b: string): void => {
        let rootA = find(a), rootB = find(b);
        if (rootA === rootB) return;
        if (rnk.get(rootA)! < rnk.get(rootB)!) [rootA, rootB] = [rootB, rootA];
        parent.set(rootB, rootA);
        if (rnk.get(rootA) === rnk.get(rootB)) rnk.set(rootA, rnk.get(rootA)! + 1);
    };

    // Build bipartite graph: each point (x, y) is an edge between node "x:{x}" and node "y:{y}"
    for (const [x, y] of points) {
        const xNode = `x:${x}`, yNode = `y:${y}`;
        makeSet(xNode);
        makeSet(yNode);
        union(xNode, yNode);
    }

    // Count original points per component
    const componentSize = new Map<string, number>();
    for (const [x] of points) {
        const root = find(`x:${x}`);
        componentSize.set(root, (componentSize.get(root) ?? 0) + 1);
    }

    const sizes = [...componentSize.values()].sort((a, b) => b - a);

    // Adding one point merges at most 2 components (its x-row and y-row)
    // For any two distinct components, a valid bridging point always exists
    return sizes[0] + (sizes[1] ?? 0) + 1;
};