# WIS DP + Greedy Lex-Smallest Reconstruction | 85 Lines | O(n²) | 295ms

# Intuition
Finding the maximum weight is a Weighted Interval Scheduling (WIS) problem limited to 4 intervals. Finding the lexicographically smallest index set with that maximum weight requires a greedy reconstruction — picking the earliest valid index at each slot while ensuring the remaining capacity can still reach the target.

# Approach
- **Preprocessing:** Extract `left`, `right`, `weight` arrays. Sort interval indices by right endpoint (`byEnd`). For each sorted position `j`, binary search to find `prevNonOverlap[j]` — the count of sorted intervals that end strictly before interval `byEnd[j]` starts.
- **WIS DP (phase 1):** Run 4 rounds of WIS DP to compute `maxWeightByCount[c]` = best total weight using at most `c` non-overlapping intervals. Each round builds `next[j] = max(next[j-1], dp[prevNonOverlap[j-1]] + weight[byEnd[j-1]])`. Store `targetWeight = maxWeightByCount[4]`.
- **`solveWindow(minIdx, winLo, winHi, k)`:** Given a window `[winLo, winHi]` and a budget of `k` slots, run WIS DP using only intervals with index > `minIdx` that fit entirely within the window. Returns best weights for each count 0..k.
- **`bestExtra(chosen, minIdx, k)`:** Given already-chosen intervals, compute the maximum extra weight from at most `k` more intervals (index > `minIdx`) that fit in the gaps between (and around) the chosen set. Validates chosen set for self-overlap, then calls `solveWindow` per gap and merges results via knapsack.
- **Greedy reconstruction (phase 2):** For each of 4 positions, iterate candidate indices in ascending order starting after the last chosen index. Prune candidates where `chosenWeight + weight[i] + maxWeightByCount[remaining] < targetWeight`. For each surviving candidate, call `bestExtra` to check if the remaining slots can complete the target. The first candidate that passes is committed.

# Complexity
- Time complexity: $$O(n^2)$$ — preprocessing is $$O(n \log n)$$; reconstruction iterates up to $$O(n)$$ candidates per slot (4 slots), each calling `bestExtra` which runs `solveWindow` over gaps in $$O(n \times k) = O(n)$$ total per candidate.

- Space complexity: $$O(n)$$ — sorted index arrays, DP arrays, and window buffers.

# Code
```typescript []
const maximumWeight = (intervals: number[][]): number[] => {
    const n = intervals.length;
    const left   = new Int32Array(n);
    const right  = new Int32Array(n);
    const weight = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        left[i] = intervals[i][0]; right[i] = intervals[i][1]; weight[i] = intervals[i][2];
    }

    const byEnd = Array.from({ length: n }, (_, i) => i).sort((a, b) => right[a] - right[b]);
    const sortedEnds = Float64Array.from(byEnd, j => right[j]);

    const prevNonOverlap = new Int32Array(n);
    for (let j = 0; j < n; j++) {
        const lim = left[byEnd[j]] - 1;
        let lo = 0, hi = j;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (sortedEnds[mid] <= lim) lo = mid + 1; else hi = mid; }
        prevNonOverlap[j] = lo;
    }

    const maxWeightByCount = new Float64Array(5);
    let dp = new Float64Array(n + 1);
    for (let c = 1; c <= 4; c++) {
        const next = new Float64Array(n + 1);
        for (let j = 1; j <= n; j++) {
            const idx = byEnd[j - 1];
            next[j] = Math.max(next[j - 1], dp[prevNonOverlap[j - 1]] + weight[idx]);
        }
        maxWeightByCount[c] = next[n];
        dp = next;
    }
    const targetWeight = maxWeightByCount[4];

    const solveWindow = (minIdx: number, winLo: number, winHi: number, k: number): Float64Array => {
        const windowPos: number[] = [];
        for (let j = 0; j < n; j++) {
            const idx = byEnd[j];
            if (idx > minIdx && left[idx] >= winLo && right[idx] <= winHi) windowPos.push(j);
        }
        const wm = windowPos.length;
        const dpLayers: Float64Array[] = [new Float64Array(wm + 1)];
        let prev = dpLayers[0];
        for (let c = 1; c <= k; c++) {
            const cur = new Float64Array(wm + 1);
            for (let j = 1; j <= wm; j++) {
                const idx = byEnd[windowPos[j - 1]];
                const lim = left[idx] - 1;
                let lo = 0, hi = j;
                while (lo < hi) { const mid = (lo + hi) >> 1; if (sortedEnds[windowPos[mid]] <= lim) lo = mid + 1; else hi = mid; }
                cur[j] = Math.max(cur[j - 1], prev[lo] + weight[idx]);
            }
            dpLayers.push(cur);
            prev = cur;
        }
        const result = new Float64Array(k + 1);
        for (let c = 0; c <= k; c++) result[c] = dpLayers[Math.min(c, wm)][wm];
        return result;
    };

    const bestExtra = (chosen: number[], minIdx: number, k: number): number => {
        const sortedChosen = chosen.slice().sort((a, b) => left[a] - left[b]);
        for (let i = 1; i < sortedChosen.length; i++)
            if (right[sortedChosen[i - 1]] >= left[sortedChosen[i]]) return -1;

        const gaps: [number, number][] = [
            [1, left[sortedChosen[0]] - 1],
            ...sortedChosen.slice(1).map((v, i) => [right[sortedChosen[i]] + 1, left[v] - 1] as [number, number]),
            [right[sortedChosen[sortedChosen.length - 1]] + 1, 1_000_000_000],
        ];

        let acc = new Float64Array(k + 1);
        for (const [gLo, gHi] of gaps) {
            if (gLo > gHi || k === 0) continue;
            const gapBest = solveWindow(minIdx, gLo, gHi, k);
            const merged = new Float64Array(k + 1);
            for (let c = 0; c <= k; c++) {
                let best = -1;
                for (let c2 = 0; c2 <= c; c2++) { const v = acc[c - c2] + gapBest[c2]; if (v > best) best = v; }
                merged[c] = best;
            }
            acc = merged;
        }
        return acc[k];
    };

    const pruned = new Set<number>();
    const answer: number[] = [];
    let chosenWeight = 0;

    outer: for (let pos = 0; pos < 4; pos++) {
        const start = answer.length ? answer[answer.length - 1] + 1 : 0;
        const remaining = 4 - answer.length - 1;

        for (let i = start; i < n; i++) {
            if (chosenWeight + weight[i] + maxWeightByCount[remaining] < targetWeight) continue;

            let overlaps = false;
            for (const j of answer)
                if (!(right[j] < left[i] || right[i] < left[j])) { overlaps = true; break; }
            if (overlaps) continue;

            const key = i * n + answer.length;
            if (pruned.has(key)) continue;

            const extra = bestExtra(answer.concat([i]), i, remaining);
            if (extra >= 0 && chosenWeight + weight[i] + extra === targetWeight) {
                answer.push(i); chosenWeight += weight[i]; continue outer;
            }
            if (extra >= 0) pruned.add(key);
        }
        break;
    }

    return answer;
};
```