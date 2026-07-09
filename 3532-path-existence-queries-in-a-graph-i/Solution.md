# Sorted Group ID Linear Scan | 8 Lines | O(n + q) | 18ms

# Intuition
Since `nums` is sorted, edges only exist between nodes with close values. A connectivity break occurs exactly when two adjacent nodes have a difference exceeding `maxDiff` — splitting the graph into contiguous groups. Two nodes are connected iff they belong to the same group.

# Approach
- Scan `nums` left to right. Start with `currentGroup = 0`. Whenever `nums[i] - nums[i-1] > maxDiff`, increment `currentGroup`. Assign `groupId[i] = currentGroup`.
- For each query `[u, v]`, return `groupId[u] === groupId[v]`.
- This works because within a sorted array, if adjacent nodes are connected, the transitivity of connectivity forms contiguous intervals. A gap larger than `maxDiff` between adjacent nodes guarantees no edge exists anywhere across that gap.

# Complexity
- Time complexity: $$O(n + q)$$ — one pass to assign groups, one pass over queries.

- Space complexity: $$O(n)$$ — the group ID array.

# Code
```typescript []
const pathExistenceQueries = (n: number, nums: number[], maxDiff: number, queries: number[][]): boolean[] => {
    const groupId = new Array(n);
    let currentGroup = 0;
    groupId[0] = currentGroup;

    for (let i = 1; i < n; i++) {
        if (nums[i] - nums[i - 1] > maxDiff) currentGroup++;
        groupId[i] = currentGroup;
    }

    return queries.map(([u, v]) => groupId[u] === groupId[v]);
};
```