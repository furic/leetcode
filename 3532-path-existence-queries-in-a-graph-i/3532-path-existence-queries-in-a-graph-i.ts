const pathExistenceQueries = (n: number, nums: number[], maxDiff: number, queries: number[][]): boolean[] => {
    // Precompute if consecutive nodes are directly connected
    const canConnectNext = Array.from({ length: n - 1 }, (_, i) => nums[i + 1] - nums[i] <= maxDiff);

    return queries.map(([u, v]) => {
        if (u === v) return true; // A node always connects to itself
        if (u > v) [u, v] = [v, u]; // Ensure u < v for simpler traversal

        // Check if all intermediate edges exist between u and v
        for (let i = u; i < v; i++) {
            if (!canConnectNext[i]) return false;
        }
        return true;
    });
};