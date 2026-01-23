# Min-Heap with Inversion Tracking | 162 Lines | O(n² log n) | 1772ms

# Intuition

Track inversions (positions where nums[i] > nums[i+1]) and use a min-heap to always merge the smallest sum pair. Maintain a linked list to handle adjacent pairs as elements merge. Stop when no inversions remain.

# Approach

**Data Structures:**
- Min-heap: stores [sum, leftIndex] pairs ordered by sum
- Doubly-linked list: tracks adjacency after merges
- Inversion count: number of positions where array[i] > array[i+1]

**Algorithm:**
1. Build initial heap with all adjacent pairs
2. Count initial inversions
3. While inversions > 0:
   - Pop minimum sum pair from heap
   - Validate pair is still adjacent (may be stale)
   - Calculate inversion changes from merge
   - Merge pair: replace left with sum, remove right
   - Update linked list to maintain adjacency
   - Add new pairs involving merged element
   - Increment operation count

**Inversion Tracking:**
- Before merge: subtract inversions involving merged pair
- After merge: add new inversions created by merge
- This efficiently maintains count without full array scan

**Example: nums=[5,2,3,1]**

Initial: inversions=3 (5>2, 2>1, 3>1)
Heap: [(3,2), (6,0), (7,1)]

Op 1: Merge (3,1)→4 at index 2
- Remove inversions: 2>1✓, 3>1✓
- Array: [5,2,4]
- Add inversions: 2>4? No
- New inversions: 1

Op 2: Merge (2,4)→6 at index 1
- Remove inversions: 5>2✓
- Array: [5,6]
- New inversions: 0 ✓

Result: 2 operations

# Complexity

- Time complexity: $$O(n^2 \log n)$$
  - Build heap: O(n log n)
  - Up to O(n) merges (worst case)
  - Per merge: O(log n) heap operations
  - Total: O(n² log n) worst case
  - Average case better due to early termination

- Space complexity: $$O(n)$$
  - Heap: O(n)
  - Linked list arrays: O(n)
  - Working array: O(n)
  - Overall: O(n)

# Code
```typescript []
const minimumPairRemoval = (nums: number[]): number => {
    const arrayLength = nums.length;
    if (arrayLength <= 1) return 0;

    const workingArray = nums.slice();

    const leftNeighbor = new Array<number>(arrayLength).fill(-1);
    const rightNeighbor = new Array<number>(arrayLength).fill(-1);

    for (let i = 0; i < arrayLength; i++) {
        leftNeighbor[i] = i - 1;
        rightNeighbor[i] = (i + 1 < arrayLength) ? i + 1 : -1;
    }

    class MinPairHeap {
        private heap: [number, number][];

        constructor() { 
            this.heap = [];
        }

        push(pair: [number, number]): void {
            const h = this.heap;
            h.push(pair);
            
            let currentIndex = h.length - 1;
            while (currentIndex > 0) {
                const parentIndex = (currentIndex - 1) >> 1;
                
                if (h[parentIndex][0] < h[currentIndex][0] || 
                    (h[parentIndex][0] === h[currentIndex][0] && h[parentIndex][1] <= h[currentIndex][1])) {
                    break;
                }
                
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
                
                let currentIndex = 0;
                while (true) {
                    const leftChild = currentIndex * 2 + 1;
                    const rightChild = leftChild + 1;
                    let smallest = currentIndex;

                    if (leftChild < h.length && 
                        (h[leftChild][0] < h[smallest][0] || 
                         (h[leftChild][0] === h[smallest][0] && h[leftChild][1] < h[smallest][1]))) {
                        smallest = leftChild;
                    }
                    
                    if (rightChild < h.length && 
                        (h[rightChild][0] < h[smallest][0] || 
                         (h[rightChild][0] === h[smallest][0] && h[rightChild][1] < h[smallest][1]))) {
                        smallest = rightChild;
                    }

                    if (smallest === currentIndex) break;
                    
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

    const minPairHeap = new MinPairHeap();
    for (let i = 0; i < arrayLength - 1; i++) {
        minPairHeap.push([workingArray[i] + workingArray[i + 1], i]);
    }

    let remainingInversions = 0;
    for (let i = 0; i < arrayLength - 1; i++) {
        if (workingArray[i] > workingArray[i + 1]) {
            remainingInversions++;
        }
    }

    let operationCount = 0;

    while (remainingInversions > 0) {
        const [pairSum, leftIndex] = minPairHeap.pop();
        const rightIndex = rightNeighbor[leftIndex];

        if (rightIndex === -1) continue;
        if (leftNeighbor[rightIndex] !== leftIndex) continue;
        if (workingArray[leftIndex] + workingArray[rightIndex] !== pairSum) continue;

        const leftOfPair = leftNeighbor[leftIndex];
        const rightOfRight = rightNeighbor[rightIndex];

        if (leftOfPair !== -1 && workingArray[leftOfPair] > workingArray[leftIndex]) {
            remainingInversions--;
        }
        if (workingArray[leftIndex] > workingArray[rightIndex]) {
            remainingInversions--;
        }
        if (rightOfRight !== -1 && workingArray[rightIndex] > workingArray[rightOfRight]) {
            remainingInversions--;
        }

        workingArray[leftIndex] = pairSum;

        rightNeighbor[leftIndex] = rightOfRight;
        if (rightOfRight !== -1) {
            leftNeighbor[rightOfRight] = leftIndex;
        }
        
        leftNeighbor[rightIndex] = rightNeighbor[rightIndex] = -1;

        if (leftOfPair !== -1 && workingArray[leftOfPair] > workingArray[leftIndex]) {
            remainingInversions++;
        }
        if (rightOfRight !== -1 && workingArray[leftIndex] > workingArray[rightOfRight]) {
            remainingInversions++;
        }

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
```