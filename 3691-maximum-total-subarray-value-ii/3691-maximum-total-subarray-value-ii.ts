const maxTotalValue = (nums: number[], k: number): number => {
    // --- Segment tree for range max and min queries ---
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

    // --- Max-heap ordered by subarray value ---
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

    // Seed heap: for each left boundary, the best right is n-1
    for (let l = 0; l < n; l++)
        heapPush({ val: rangeValue(l, n - 1), l, r: n - 1 });

    // Greedily pick the k highest-value subarrays
    let total = 0;
    for (let i = 0; i < k; i++) {
        const { val, l, r } = heapPop();
        total += val;
        if (r > l) heapPush({ val: rangeValue(l, r - 1), l, r: r - 1 });
    }

    return total;
};