# Case Split + Non-Adjacent Selection Heap | 55 Lines | O(n log n) | 51ms

# Intuition
Peaks can't be adjacent (a peak must be strictly greater than both neighbors). The circular structure makes index 0 special — it's adjacent to both index 1 and index `n-1`. We break the circular dependency by case-splitting on whether index 0 is a peak, reducing both cases to the classical "select exactly k non-adjacent elements with minimum total cost" on a linear array.

# Approach
- **`peakCost(i)`:** The cost to make index `i` a peak is `max(0, max(prev, next) + 1 - nums[i])` — how much we need to raise `nums[i]` above its taller neighbour.
- **Feasibility:** A circular array of length `n` can have at most `floor(n/2)` peaks (non-adjacency), so return `-1` if `k > floor(n/2)`.
- **Case split (break the circular edge between 0 and n-1):**
  - **Case A:** Index 0 is not a peak — select `k` non-adjacent peaks from indices `[1..n-1]` (now a linear array, no wrap-around edge).
  - **Case B:** Index 0 is a peak — pay `peakCost(0)`, then select `k-1` non-adjacent peaks from indices `[2..n-2]` (indices 1 and n-1 are excluded since they're adjacent to 0).
- **`selectMinNonAdjacent(costs, sel)`** — classic greedy with node cancellation (Gabow/Tarjan-style):
  - Use a min-heap to always pick the cheapest available peak candidate.
  - After selecting node `i`, replace it with a "virtual node" of cost `val[L] + val[R] - val[i]`. Selecting this virtual node later effectively undoes picking `i` and instead picks both its neighbours — this models the non-adjacency constraint without explicit DP.
  - Remove the physical neighbours `L` and `R` from a doubly-linked list so they can't be independently selected again.
  - Repeat `sel` times, accumulating total cost.
- Return `min(caseA, caseB)`.

# Complexity
- Time complexity: $$O(n \log n)$$ — heap operations dominate; `selectMinNonAdjacent` runs in $$O(n \log n)$$ per case.

- Space complexity: $$O(n)$$ — heap, linked list arrays, and cost arrays.

# Code
```typescript []
const minOperations = (nums: number[], k: number): number => {
    const n = nums.length;
    if (k === 0) return 0;
    if (k > Math.floor(n / 2)) return -1;

    const peakCost = (i: number): number => {
        const prev = nums[(i - 1 + n) % n];
        const next = nums[(i + 1) % n];
        return Math.max(0, Math.max(prev, next) + 1 - nums[i]);
    };

    const selectMinNonAdjacent = (costs: number[], sel: number): number => {
        const m = costs.length;
        if (sel === 0) return 0;
        if (sel > Math.floor((m + 1) / 2)) return Infinity;

        const INF = 1e18;
        const val = costs.slice();
        const prv = new Int32Array(m);
        const nxt = new Int32Array(m);
        const dead = new Uint8Array(m);

        for (let i = 0; i < m; i++) { prv[i] = i - 1; nxt[i] = i + 1; }
        nxt[m - 1] = -1;

        const pq = new MinPriorityQueue<[number, number]>((x) => x[0]);
        for (let i = 0; i < m; i++) pq.push([val[i], i]);

        let total = 0;
        for (let s = 0; s < sel; s++) {
            while (pq.size() > 0 && dead[pq.front()![1]]) pq.pop();
            const [c, node] = pq.pop()!;
            total += c;

            const L = prv[node], R = nxt[node];
            const valL = L === -1 ? INF : val[L];
            const valR = R === -1 ? INF : val[R];

            val[node] = valL + valR - c;
            pq.push([val[node], node]);

            if (L !== -1) {
                dead[L] = 1;
                prv[node] = prv[L];
                if (prv[L] !== -1) nxt[prv[L]] = node;
            }

            if (R !== -1) {
                dead[R] = 1;
                nxt[node] = nxt[R];
                if (nxt[R] !== -1) prv[nxt[R]] = node;
            }
        }

        return total;
    };

    const costsA: number[] = [];
    for (let i = 1; i < n; i++) costsA.push(peakCost(i));
    const caseA = selectMinNonAdjacent(costsA, k);

    let caseB: number;
    if (n < 4) {
        caseB = k === 1 ? peakCost(0) : Infinity;
    } else {
        const costsB: number[] = [];
        for (let i = 2; i <= n - 2; i++) costsB.push(peakCost(i));
        caseB = peakCost(0) + selectMinNonAdjacent(costsB, k - 1);
    }

    return Math.min(caseA, caseB);
};
```