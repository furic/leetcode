# Sorted Position + Binary Lifting Reachability | 36 Lines | O((n + q) log n) | 318ms

# Intuition
Sort nodes by value to work in a linear interval structure. Each node `i` (in sorted order) can reach all nodes in a contiguous window ending at `reachableIndex[i]`. The minimum distance between two nodes is the number of "hops" (window jumps) needed — exactly the kind of problem binary lifting solves in O(log n) per query.

# Approach
- **Sort and position map:** Sort node indices by `nums` value. Record `position[node]` (its rank in sorted order) and `values[i]` (the sorted values).
- **Reachable window:** For each sorted index `i`, find the furthest `j` such that `values[j] - values[i] <= maxDiff` using a two-pointer scan. Store as `reachableIndex[i]`.
- **Binary lifting table:** `upTable[k][i]` = the furthest reachable index from `i` after `2^k` jumps. Build by: `upTable[k][i] = upTable[k-1][upTable[k-1][i]]`.
- **Per query `[start, end]`:**
  - Convert to sorted positions `startPos`, `endPos` (ensure `startPos <= endPos`).
  - If same node: return `0`.
  - If directly reachable (`|nums[start] - nums[end]| <= maxDiff`): return `1`.
  - If `reachableIndex[startPos] < endPos`: binary lift from `startPos`, accumulating jumps until we can reach `endPos`. If stuck (frontier doesn't advance), return `-1`. Otherwise return `jumpCount + 1`.
  - If `reachableIndex[startPos] >= endPos`: already covered in one hop → return `1`.

# Complexity
- Time complexity: $$O((n + q) \log n)$$ — binary lifting table build is $$O(n \log n)$$; each query is $$O(\log n)$$.

- Space complexity: $$O(n \log n)$$ — the lifting table.

# Code
```typescript []
const pathExistenceQueries = (
    n: number,
    nums: number[],
    maxDiff: number,
    queries: number[][]
): number[] => {
    const sortedIndices: number[] = Array.from({ length: n }, (_, i) => i);
    const position: number[] = Array(n).fill(0);
    const values: number[] = Array(n).fill(0);

    sortedIndices.sort((a, b) => nums[a] - nums[b]);
    for (let i = 0; i < n; ++i) {
        position[sortedIndices[i]] = i;
        values[i] = nums[sortedIndices[i]];
    }

    const reachableIndex: number[] = Array(n).fill(0);
    let j = 0;
    for (let i = 0; i < n; ++i) {
        if (j < i) j = i;
        while (j + 1 < n && values[j + 1] - values[i] <= maxDiff) ++j;
        reachableIndex[i] = j;
    }

    let maxLog = 1;
    while ((1 << maxLog) < n) ++maxLog;

    const upTable: number[][] = Array.from({ length: maxLog }, () => Array(n).fill(0));
    upTable[0] = reachableIndex.slice();
    for (let k = 1; k < maxLog; ++k)
        for (let i = 0; i < n; ++i)
            upTable[k][i] = upTable[k - 1][upTable[k - 1][i]];

    return queries.map(([start, end]) => {
        if (start === end) return 0;

        let startPos = position[start], endPos = position[end];
        if (startPos > endPos) [startPos, endPos] = [endPos, startPos];

        if (Math.abs(nums[start] - nums[end]) <= maxDiff) return 1;

        if (reachableIndex[startPos] < endPos) {
            let current = startPos;
            let jumpCount = 0;
            for (let k = maxLog - 1; k >= 0; --k) {
                if (upTable[k][current] < endPos) {
                    if (upTable[k][current] === current) break;
                    current = upTable[k][current];
                    jumpCount += 1 << k;
                }
            }
            return reachableIndex[current] >= endPos ? jumpCount + 1 : -1;
        }

        return 1;
    });
};
```