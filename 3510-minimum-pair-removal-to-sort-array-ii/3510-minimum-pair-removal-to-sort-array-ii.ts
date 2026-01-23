/**
 * Finds minimum operations to make array non-decreasing by merging adjacent pairs
 * Strategy: Use min-heap to always merge smallest sum pairs, track inversions until array is sorted
 * Maintains linked list structure as elements are merged
 */
const minimumPairRemoval = (nums: number[]): number => {
    const arrayLength = nums.length;
    if (arrayLength <= 1) return 0;

    // Working copy of array that gets modified during merges
    const workingArray = nums.slice();

    // Doubly-linked list to track which elements are adjacent after merges
    // leftNeighbor[i] = index of element to the left of i (-1 if none)
    // rightNeighbor[i] = index of element to the right of i (-1 if none)
    const leftNeighbor = new Array<number>(arrayLength).fill(-1);
    const rightNeighbor = new Array<number>(arrayLength).fill(-1);

    // Initialize linked list: each element has left and right neighbors
    for (let i = 0; i < arrayLength; i++) {
        leftNeighbor[i] = i - 1;
        rightNeighbor[i] = (i + 1 < arrayLength) ? i + 1 : -1;
    }

    /**
     * Min-heap that stores pairs as [sum, leftIndex]
     * Orders by sum (ascending), with leftmost pair as tiebreaker
     */
    class MinPairHeap {
        private heap: [number, number][];

        constructor() { 
            this.heap = [];
        }

        push(pair: [number, number]): void {
            const h = this.heap;
            h.push(pair);
            
            // Bubble up
            let currentIndex = h.length - 1;
            while (currentIndex > 0) {
                const parentIndex = (currentIndex - 1) >> 1;
                
                // Check if parent is smaller or equal (heap property satisfied)
                if (h[parentIndex][0] < h[currentIndex][0] || 
                    (h[parentIndex][0] === h[currentIndex][0] && h[parentIndex][1] <= h[currentIndex][1])) {
                    break;
                }
                
                // Swap with parent
                [h[parentIndex], h[currentIndex]] = [h[currentIndex], h[parentIndex]];
                currentIndex = parentIndex;
            }
        }

        pop(): [number, number] {
            const h = this.heap;
            const minPair = h[0];
            const lastPair = h.pop() as [number, number];
            
            if (h.length > 0) {
                h[0] = lastPair;
                
                // Bubble down
                let currentIndex = 0;
                while (true) {
                    const leftChild = currentIndex * 2 + 1;
                    const rightChild = leftChild + 1;
                    let smallest = currentIndex;

                    // Check left child
                    if (leftChild < h.length && 
                        (h[leftChild][0] < h[smallest][0] || 
                         (h[leftChild][0] === h[smallest][0] && h[leftChild][1] < h[smallest][1]))) {
                        smallest = leftChild;
                    }
                    
                    // Check right child
                    if (rightChild < h.length && 
                        (h[rightChild][0] < h[smallest][0] || 
                         (h[rightChild][0] === h[smallest][0] && h[rightChild][1] < h[smallest][1]))) {
                        smallest = rightChild;
                    }

                    // Heap property satisfied
                    if (smallest === currentIndex) break;
                    
                    // Swap with smallest child
                    [h[smallest], h[currentIndex]] = [h[currentIndex], h[smallest]];
                    currentIndex = smallest;
                }
            }
            
            return minPair;
        }

        size(): number {
            return this.heap.length;
        }
    }

    // Build initial heap with all adjacent pairs
    const minPairHeap = new MinPairHeap();
    for (let i = 0; i < arrayLength - 1; i++) {
        minPairHeap.push([workingArray[i] + workingArray[i + 1], i]);
    }

    // Count initial inversions (positions where array[i] > array[i+1])
    // Goal: reduce this to 0 to make array non-decreasing
    let remainingInversions = 0;
    for (let i = 0; i < arrayLength - 1; i++) {
        if (workingArray[i] > workingArray[i + 1]) {
            remainingInversions++;
        }
    }

    let operationCount = 0;

    // Keep merging pairs until array is non-decreasing
    while (remainingInversions > 0) {
        const [pairSum, leftIndex] = minPairHeap.pop();
        const rightIndex = rightNeighbor[leftIndex];

        // Validation checks (pair might be stale from earlier merges)
        if (rightIndex === -1) continue; // Right element was already merged
        if (leftNeighbor[rightIndex] !== leftIndex) continue; // Not adjacent anymore
        if (workingArray[leftIndex] + workingArray[rightIndex] !== pairSum) continue; // Values changed

        // Get neighbors of the pair being merged
        const leftOfPair = leftNeighbor[leftIndex];
        const rightOfRight = rightNeighbor[rightIndex];

        // Subtract inversions that will be removed by this merge
        if (leftOfPair !== -1 && workingArray[leftOfPair] > workingArray[leftIndex]) {
            remainingInversions--;
        }
        if (workingArray[leftIndex] > workingArray[rightIndex]) {
            remainingInversions--;
        }
        if (rightOfRight !== -1 && workingArray[rightIndex] > workingArray[rightOfRight]) {
            remainingInversions--;
        }

        // Perform the merge: replace leftIndex with merged sum
        workingArray[leftIndex] = pairSum;

        // Update linked list: remove rightIndex, connect leftIndex to rightOfRight
        rightNeighbor[leftIndex] = rightOfRight;
        if (rightOfRight !== -1) {
            leftNeighbor[rightOfRight] = leftIndex;
        }
        
        // Mark rightIndex as removed
        leftNeighbor[rightIndex] = rightNeighbor[rightIndex] = -1;

        // Add inversions created by the merge
        if (leftOfPair !== -1 && workingArray[leftOfPair] > workingArray[leftIndex]) {
            remainingInversions++;
        }
        if (rightOfRight !== -1 && workingArray[leftIndex] > workingArray[rightOfRight]) {
            remainingInversions++;
        }

        // Add new pairs involving the merged element to heap
        if (leftOfPair !== -1) {
            minPairHeap.push([workingArray[leftOfPair] + workingArray[leftIndex], leftOfPair]);
        }
        if (rightOfRight !== -1) {
            minPairHeap.push([workingArray[leftIndex] + workingArray[rightOfRight], leftIndex]);
        }
        
        operationCount++;
    }

    return operationCount;
};