function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
    const n = nums.length;
    const sortedIndices = [...Array(n).keys()].sort((a, b) => nums[a] - nums[b]); // Sort indices by values
    const result = new Array(n);
    
    // Union-Find data structure for connected components
    const parent = Array(n).fill(0).map((_, i) => i);

    function find(x: number): number {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    function union(x: number, y: number) {
        parent[find(x)] = find(y);
    }

    // Union indices that can be swapped
    for (let i = 1; i < n; i++) {
        if (nums[sortedIndices[i]] - nums[sortedIndices[i - 1]] <= limit) {
            union(sortedIndices[i], sortedIndices[i - 1]);
        }
    }

    // Group elements by their root parent
    const groups: Map<number, number[]> = new Map();
    for (let i = 0; i < n; i++) {
        const root = find(i);
        if (!groups.has(root)) groups.set(root, []);
        groups.get(root)!.push(nums[i]);
    }

    // Sort each connected component
    for (const group of groups.values()) {
        group.sort((a, b) => a - b);
    }

    // Reconstruct the lexicographically smallest array
    const indices: Map<number, number[]> = new Map();
    for (const [i, root] of parent.entries()) {
        if (!indices.has(root)) indices.set(root, []);
        indices.get(root)!.push(i);
    }

    for (const [root, idxs] of indices.entries()) {
        const values = groups.get(root)!;
        for (const idx of idxs) {
            result[idx] = values.shift()!;
        }
    }

    return result;
}