function maxTotalValue(nums: number[], k: number): number {
    interface Node { val: number; l: number; r: number; }

    class MaxHeap {
        private heap: Node[] = [];
        push(node: Node): void {
            this.heap.push(node);
            let idx = this.heap.length - 1;
            while (idx > 0) {
                let parent = Math.floor((idx - 1) / 2);
                if (this.heap[idx].val <= this.heap[parent].val) break;
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            }
        }
        pop(): Node {
            const top = this.heap[0];
            const last = this.heap.pop()!;
            if (this.heap.length > 0) {
                this.heap[0] = last;
                let idx = 0;
                while (true) {
                    let left = 2 * idx + 1, right = 2 * idx + 2, largest = idx;
                    if (left < this.heap.length && this.heap[left].val > this.heap[largest].val) largest = left;
                    if (right < this.heap.length && this.heap[right].val > this.heap[largest].val) largest = right;
                    if (largest === idx) break;
                    [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
                    idx = largest;
                }
            }
            return top;
        }
    }
    const n = nums.length;
    let size = 1; while (size < n) size *= 2;
    const segMax = new Int32Array(2 * size).fill(0);
    const segMin = new Int32Array(2 * size).fill(1e9);

    for (let i = 0; i < n; i++) segMax[size + i] = segMin[size + i] = nums[i];
    for (let i = size - 1; i > 0; i--) {
        segMax[i] = Math.max(segMax[2 * i], segMax[2 * i + 1]);
        segMin[i] = Math.min(segMin[2 * i], segMin[2 * i + 1]);
    }

    const query = (l: number, r: number): number => {
        let mx = 0, mn = 1e9;
        for (l += size, r += size; l <= r; l >>= 1, r >>= 1) {
            if (l & 1) { 
                mx = Math.max(mx, segMax[l]); 
                mn = Math.min(mn, segMin[l]); 
                l++; 
            }
            if (!(r & 1)) { 
                mx = Math.max(mx, segMax[r]); 
                mn = Math.min(mn, segMin[r]); 
                r--; 
            }
        }
        return mx - mn;
    };

    const pq = new MaxHeap();
    for (let l = 0; l < n; l++) 
        pq.push({val: query(l, n - 1), l, r: n - 1});

    let ans = 0;
    for (let i = 0; i < k; i++) {
        let {val, l, r} = pq.pop();
        ans += val;
        if (r > l) 
            pq.push({val: query(l, r - 1), l, r: r - 1});
    }
    return ans;
}