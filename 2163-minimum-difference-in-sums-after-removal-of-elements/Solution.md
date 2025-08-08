# Heap Based Optimization | 74 Lines | O(n²logn) |

# Intuition
After removing n elements, we're left with 2n elements split into two equal parts. To minimize the difference (left_sum - right_sum), we want to maximize the left sum and minimize the right sum. The key insight is that elements from the middle section can potentially replace elements in either the left or right optimal sets, so we need to consider all possible ways to utilize the middle section optimally.

# Approach
I'll use a heap-based approach to efficiently track optimal subsets as we consider different removal strategies:

1. **Problem Structure**: Split the array into three conceptual parts: left n elements, middle n elements, and right n elements. We need to remove exactly n elements total.

2. **Left Part Optimization**: Start with the left n elements as our initial left subset. Use a max-heap (simulated with min-heap using negated values) to maintain the n largest elements as we consider replacing elements from the middle section.

3. **Right Part Optimization**: Start with the right n elements as our initial right subset. Use a min-heap to maintain the n smallest elements as we consider replacing elements from the middle section.

4. **Dynamic Programming with Heaps**: For each possible number of removals from the middle section (0 to n), calculate the optimal left sum and right sum, then compute the difference.

5. **Heap Operations**: When processing middle elements, replace heap root if the new element would improve the objective (larger for left heap, smaller for right heap).

The algorithm considers all ways to distribute the n removals between direct removals and replacements that improve our left/right subsets.

# Complexity
- Time complexity: $$O(n^2 \log n)$$
  - Building initial heaps takes O(n log n)
  - For each of n middle elements, we perform heap operations taking O(log n)
  - We repeat this process for both left and right optimizations
  - Overall: O(n log n) for heap operations across O(n) iterations

- Space complexity: $$O(n)$$
  - Two heaps of size n each for left and right optimization
  - Arrays to store precomputed sums for each removal count
  - Total additional space is O(n)

# Code
```typescript []
const minimumDifference = (nums: number[]): number => {
    const partSize = nums.length / 3;
    
    const heapifyDown = (heap: number[], nodeIndex: number, heapSize: number): void => {
        while (2 * nodeIndex + 2 < heapSize && 
               (heap[nodeIndex] > heap[2 * nodeIndex + 1] || heap[nodeIndex] > heap[2 * nodeIndex + 2])) {
            
            let smallerChildIndex = 2 * nodeIndex + 1;
            
            if (heap[smallerChildIndex] > heap[smallerChildIndex + 1]) {
                smallerChildIndex++;
            }
            
            [heap[smallerChildIndex], heap[nodeIndex]] = [heap[nodeIndex], heap[smallerChildIndex]];
            nodeIndex = smallerChildIndex;
        }
        
        if (2 * nodeIndex + 2 === heapSize && heap[nodeIndex] > heap[2 * nodeIndex + 1]) {
            [heap[2 * nodeIndex + 1], heap[nodeIndex]] = [heap[nodeIndex], heap[2 * nodeIndex + 1]];
        }
    };
    
    const buildMinHeap = (array: number[], heapSize: number): number[] => {
        for (let startIndex = (heapSize - 2) >> 1; startIndex >= 0; startIndex--) {
            heapifyDown(array, startIndex, heapSize);
        }
        return array;
    };
    
    const replaceHeapRoot = (heap: number[], heapSize: number, newValue: number): number => {
        const removedRoot = heap[0];
        heap[0] = newValue;
        heapifyDown(heap, 0, heapSize);
        return removedRoot;
    };
    
    const leftMaxHeap = buildMinHeap(
        nums.slice(0, partSize).map(value => -value), 
        partSize
    );
    
    const leftPartSums: number[] = new Array(partSize + 1);
    leftPartSums[0] = leftMaxHeap.reduce((sum, negatedValue) => sum - negatedValue, 0);
    
    for (let middleIndex = 1; middleIndex <= partSize; middleIndex++) {
        const currentElement = nums[partSize - 1 + middleIndex];
        
        if (currentElement < -leftMaxHeap[0]) {
            const removedElement = -replaceHeapRoot(leftMaxHeap, partSize, -currentElement);
            leftPartSums[middleIndex] = leftPartSums[middleIndex - 1] + currentElement - removedElement;
        } else {
            leftPartSums[middleIndex] = leftPartSums[middleIndex - 1];
        }
    }
    
    const rightMinHeap = buildMinHeap(nums.slice(2 * partSize), partSize);
    const rightPartSums: number[] = new Array(partSize + 1).fill(0);
    
    rightPartSums[partSize] = rightMinHeap.reduce((sum, value) => sum + value, 0);
    
    for (let middleIndex = 1; middleIndex <= partSize; middleIndex++) {
        const currentElement = nums[2 * partSize - middleIndex];
        
        if (currentElement > rightMinHeap[0]) {
            const removedElement = replaceHeapRoot(rightMinHeap, partSize, currentElement);
            rightPartSums[partSize - middleIndex] = rightPartSums[partSize - middleIndex + 1] - removedElement + currentElement;
        } else {
            rightPartSums[partSize - middleIndex] = rightPartSums[partSize - middleIndex + 1];
        }
    }
    
    let minimumDifference = Number.MAX_VALUE;
    
    for (let removalCount = 0; removalCount <= partSize; removalCount++) {
        const currentDifference = leftPartSums[removalCount] - rightPartSums[removalCount];
        minimumDifference = Math.min(minimumDifference, currentDifference);
    }
    
    return minimumDifference;
};
```