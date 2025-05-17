const subtreeInversionSum = (edges: number[][], nums: number[], k: number): number => {
    const n = nums.length;

    // Build adjacency list
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const NEG_INF = -1e18;
    const MAX_DIST = 51; // Clamp distance at 50+ as per original C++ logic

    // dp[sign+1][dist+1][curr] => 3D memo table
    const dp: number[][][] = Array.from({ length: 3 }, () =>
        Array.from({ length: MAX_DIST + 2 }, () =>
            Array(n).fill(NEG_INF)
        )
    );

    const find = (
        curr: number,
        prev: number,
        sign: number,
        dist: number
    ): number => {
        if (dist > 50) dist = 50;

        const signIdx = sign + 1;
        const distIdx = dist + 1;

        if (dp[signIdx][distIdx][curr] !== NEG_INF) {
            return dp[signIdx][distIdx][curr];
        }

        if (dist === -1) {
            // Case 1: No inversion done yet
            let invert = -nums[curr];
            let noInvert = nums[curr];

            for (const next of adj[curr]) {
                if (next !== prev) {
                    invert += find(next, curr, -1, 1); // Invert this node
                }
            }

            for (const next of adj[curr]) {
                if (next !== prev) {
                    noInvert += find(next, curr, 0, -1); // Do not invert
                }
            }

            return dp[signIdx][distIdx][curr] = Math.max(invert, noInvert);
        } else if (dist >= k) {
            // Case 2: Inversion is allowed
            let invert = -nums[curr] * sign;
            let noInvert = nums[curr] * sign;

            for (const next of adj[curr]) {
                if (next !== prev) {
                    invert += find(next, curr, -sign, 1); // Flip sign and restart distance
                }
            }

            for (const next of adj[curr]) {
                if (next !== prev) {
                    noInvert += find(next, curr, sign, dist + 1); // Continue same sign, increase distance
                }
            }

            return dp[signIdx][distIdx][curr] = Math.max(invert, noInvert);
        } else {
            // Case 3: Inversion not allowed (distance too small)
            let sum = nums[curr] * sign;
            for (const next of adj[curr]) {
                if (next !== prev) {
                    sum += find(next, curr, sign, dist + 1);
                }
            }

            return dp[signIdx][distIdx][curr] = sum;
        }
    };

    return find(0, -1, 0, -1);
};