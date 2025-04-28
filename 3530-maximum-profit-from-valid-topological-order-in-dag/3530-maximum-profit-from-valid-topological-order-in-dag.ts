const maxProfit = (n: number, edges: number[][], score: number[]): number => {
    // Array that records what nodes must come before each node
    const prerequisiteMask = new Array<number>(n).fill(0);

    for (const [from, to] of edges) {
        prerequisiteMask[to] |= (1 << from);
    }

    // dp[mask]: the maximum profit achievable using nodes represented by 'mask'
    const dp = new Array<number>(1 << n).fill(-1);
    dp[0] = 0; // Base case: no nodes selected, profit is 0

    for (let mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] === -1) continue; // Invalid state, skip

        const position = countBits(mask) + 1; // Position is 1-based

        for (let node = 0; node < n; node++) {
            const isNodeSelected = (mask >> node) & 1;
            const arePrerequisitesSelected = (mask & prerequisiteMask[node]) === prerequisiteMask[node];

            if (isNodeSelected === 0 && arePrerequisitesSelected) {
                const nextMask = mask | (1 << node);
                dp[nextMask] = Math.max(dp[nextMask], dp[mask] + score[node] * position);
            }
        }
    }

    return dp[(1 << n) - 1];
};

// Helper function to count number of 1's in binary representation
const countBits = (x: number): number => {
    let count = 0;
    while (x > 0) {
        count += x & 1;
        x >>= 1;
    }
    return count;
}