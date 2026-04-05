const minOperations = (nums: number[], k: number): number => {
    const n = nums.length;
    if (k === 0) return 0;
    if (k > Math.floor(n / 2)) return -1;

    const peakCost = (i: number): number => {
        const prev = nums[(i - 1 + n) % n];
        const next = nums[(i + 1) % n];
        return Math.max(0, Math.max(prev, next) + 1 - nums[i]);
    };

    // Classic "select exactly sel non-adjacent items with min cost" via node-cancellation + min-heap
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
        nxt[m - 1] = -1; // -1 = no neighbor

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

            // Virtual node: picking it later "undoes" choosing node, picks both neighbors instead
            val[node] = valL + valR - c;
            pq.push([val[node], node]);

            // Remove L from linked list
            if (L !== -1) {
                dead[L] = 1;
                prv[node] = prv[L];
                if (prv[L] !== -1) nxt[prv[L]] = node;
            }

            // Remove R from linked list
            if (R !== -1) {
                dead[R] = 1;
                nxt[node] = nxt[R];
                if (nxt[R] !== -1) prv[nxt[R]] = node;
            }
        }

        return total;
    };

    // Case A: index 0 not a peak → pick k non-adjacent from [1..n-1]
    const costsA: number[] = [];
    for (let i = 1; i < n; i++) costsA.push(peakCost(i));
    const caseA = selectMinNonAdjacent(costsA, k);

    // Case B: index 0 is a peak → pick k-1 non-adjacent from [2..n-2]
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