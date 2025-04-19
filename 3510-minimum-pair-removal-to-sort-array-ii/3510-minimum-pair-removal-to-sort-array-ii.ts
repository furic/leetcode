class MinHeap<T> {
    private heap: T[] = [];
    constructor(private compare: (a: T, b: T) => number) { }

    push(value: T) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): T | undefined {
        if (this.size() === 0) return undefined;
        const top = this.heap[0];
        const last = this.heap.pop()!;
        if (this.size() > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }

    size(): number {
        return this.heap.length;
    }

    private bubbleUp(index: number) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else break;
        }
    }

    private bubbleDown(index: number) {
        const length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0)
                smallest = left;
            if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0)
                smallest = right;
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            } else break;
        }
    }
}

const minimumPairRemoval = (nums: number[]): number => {
    const n = nums.length;

    // Doubly linked list pointers (by index)
    const prevIndex = Array.from({ length: n }, (_, i) => i - 1);  // previous element index
    const nextIndex = Array.from({ length: n }, (_, i) => i + 1);  // next element index
    prevIndex.push(n - 1); // padding for ease
    nextIndex[n - 1] = -1;
    nextIndex.push(-1);

    console.log(prevIndex, nextIndex);

    let badPairs = 0;

    // Min-heap storing [sum, rightIndex] for adjacent pairs
    const minHeap = new MinHeap<[number, number]>((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1]; // Tie-break using index
    });

    // Initialize heap and count decreasing adjacent pairs
    for (let i = 1; i < n; i++) {
        if (nums[i - 1] > nums[i]) badPairs++;
        minHeap.push([nums[i - 1] + nums[i], i]);
    }

    let removalCount = 0;

    // Process while there are still decreasing pairs
    while (badPairs > 0 && minHeap.size() > 0) {
        const [pairSum, right] = minHeap.pop()!;
        const left = prevIndex[right];

        // Skip outdated entries
        if (left === -1 || nums[left] + nums[right] !== pairSum) continue;

        const leftLeft = prevIndex[left];
        const rightRight = nextIndex[right];

        // Connect left and rightRight directly (remove right)
        nextIndex[left] = rightRight;
        if (rightRight !== -1) prevIndex[rightRight] = left;

        // Update bad pair count (left, right was a decreasing pair)
        if (nums[left] > nums[right]) badPairs--;

        // Update left neighbor if it exists
        if (leftLeft !== -1) {
            const wasBad = nums[leftLeft] > nums[left] ? 1 : 0;
            const nowBad = nums[leftLeft] > pairSum ? 1 : 0;
            badPairs += nowBad - wasBad;

            minHeap.push([nums[leftLeft] + pairSum, left]);
        }

        // Update right neighbor if it exists
        if (rightRight !== -1) {
            const wasBad = nums[right] > nums[rightRight] ? 1 : 0;
            const nowBad = pairSum > nums[rightRight] ? 1 : 0;
            badPairs += nowBad - wasBad;

            minHeap.push([nums[rightRight] + pairSum, rightRight]);
        }

        // Replace left value with merged value, mark right as removed
        nums[left] = pairSum;
        nums[right] = Infinity;

        removalCount++;
    }

    return removalCount;
}