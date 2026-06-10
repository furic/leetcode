# Segment Tree + Max-Heap Subarray Value | 55 Lines | O((n + k) log n) | 248ms

# Intuition
We want the `k` largest subarray values (max - min). There are O(n²) subarrays but we can't enumerate all of them. Key insight: for a fixed left endpoint `l`, the best right endpoint is always `n-1` (wider subarrays have at least as large a value). We use a max-heap seeded with `(l, n-1)` for every `l`, and greedily pop the best subarray, then push its "shrunk" version `(l, r-1)`.

# Approach
- **Segment tree:** Build a combined max/min segment tree for O(log n) range queries. `rangeValue(l, r)` returns `max - min` over `nums[l..r]`.
- **Max-heap seeding:** For each left boundary `l ∈ [0, n-1]`, push `{val: rangeValue(l, n-1), l, r: n-1}`. This covers all "rightmost" subarrays for every left anchor.
- **Greedy extraction:** Pop the maximum-value subarray `(l, r)` from the heap `k` times. After popping `(l, r)`, push `(l, r-1)` if `r > l` — this is the next best subarray with the same left boundary.
- **Correctness:** Every subarray `(l, r)` is reachable via the sequence `(l, n-1) → (l, n-2) → ... → (l, r)`. Since popping always takes the global maximum and pushes the next candidate, no subarray is skipped and no duplicate is generated.

# Complexity
- Time complexity: $$O((n + k) \log n)$$ — seeding is $$O(n \log n)$$ (n range queries + n heap pushes); each of the k pop/push operations costs $$O(\log n)$$ for the heap and $$O(\log n)$$ for the range query.

- Space complexity: $$O(n)$$ — segment tree size `2 × size` and heap holds at most `n` entries at any time.

# Code
```typescript []
const maxTotalValue = (nums: number[], k: number): number => {
    const n = nums.length;
    let size = 1;
    while (size < n) size *= 2;

    const segMax = new Int32Array(2 * size).fill(0);
    const segMin = new Int32Array(2 * size).fill(1e9);

    for (let i = 0; i < n; i++) segMax[size + i] = segMin[size + i] = nums[i];
    for (let i = size - 1; i > 0; i--) {
        segMax[i] = Math.max(segMax[2 * i], segMax[2 * i + 1]);
        segMin[i] = Math.min(segMin[2 * i], segMin[2 * i + 1]);
    }

    const rangeValue = (l: number, r: number): number => {
        let rangeMax = 0, rangeMin = 1e9;
        for (l += size, r += size; l <= r; l >>= 1, r >>= 1) {
            if (l & 1) { rangeMax = Math.max(rangeMax, segMax[l]); rangeMin = Math.min(rangeMin, segMin[l++]); }
            if (!(r & 1)) { rangeMax = Math.max(rangeMax, segMax[r]); rangeMin = Math.min(rangeMin, segMin[r--]); }
        }
        return rangeMax - rangeMin;
    };

    interface SubarrayNode { val: number; l: number; r: number; }
    const heap: SubarrayNode[] = [];

    const heapPush = (node: SubarrayNode): void => {
        heap.push(node);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[i].val <= heap[parent].val) break;
            [heap[i], heap[parent]] = [heap[parent], heap[i]];
            i = parent;
        }
    };

    const heapPop = (): SubarrayNode => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const left = 2 * i + 1, right = 2 * i + 2;
                let largest = i;
                if (left  < heap.length && heap[left].val  > heap[largest].val) largest = left;
                if (right < heap.length && heap[right].val > heap[largest].val) largest = right;
                if (largest === i) break;
                [heap[i], heap[largest]] = [heap[largest], heap[i]];
                i = largest;
            }
        }
        return top;
    };

    for (let l = 0; l < n; l++)
        heapPush({ val: rangeValue(l, n - 1), l, r: n - 1 });

    let total = 0;
    for (let i = 0; i < k; i++) {
        const { val, l, r } = heapPop();
        total += val;
        if (r > l) heapPush({ val: rangeValue(l, r - 1), l, r: r - 1 });
    }

    return total;
};
```