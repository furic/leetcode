# Dual Heap DP Optimization | 103 Lines | O(n log n) | 961ms

# Intuition
To create k non-overlapping subarrays of size x where all elements are equal, we need to: (1) determine the optimal value each subarray should become (the median minimizes total operations), and (2) choose which k windows to use. This combines a sliding window median problem with dynamic programming to select non-overlapping windows optimally.

# Approach
I'll use dual heaps for median tracking combined with DP for window selection:

1. **Sliding Window Median with Dual Heaps**:
   - Maintain two heaps: max heap (lower half) and min heap (upper half)
   - Keep heaps balanced so lower half size ≥ upper half size
   - Median is always the top of the lower half (max heap)
   - Use lazy deletion with deletion tracking maps for efficiency

2. **Cost Calculation per Window**:
   - For each window, median minimizes total operations
   - Cost = sum of |element - median| for all elements in window
   - Optimize using: cost = (median × lowerSize - lowerSum) + (upperSum - median × upperSize)

3. **Dynamic Programming for Window Selection**:
   - State: dp[subarrayCount][windowIndex] = min cost using subarrayCount subarrays up to window windowIndex
   - Transition: dp[k][i] = min(dp[k-1][j] + cost[i]) where j is any non-overlapping previous window
   - Optimization: Track minimum of previous states to avoid redundant computation

4. **Non-Overlapping Constraint**: Windows are non-overlapping if they're at least x positions apart, so we only consider previous windows ending at least x positions before the current window.

5. **Lazy Deletion Strategy**: Mark elements as deleted without immediately removing them from heaps, then clean heaps only when accessing the top element for better amortized performance.

# Complexity
- Time complexity: $$O(n \log n + nk)$$
  - Building initial window and sliding: O(n log x) for heap operations
  - DP table filling: O(n × k) for k subarrays across n windows
  - Overall: O(n log n + nk)

- Space complexity: $$O(n + k)$$
  - Heaps store at most x elements: O(x)
  - Deletion tracking maps: O(x)
  - DP table: O(k × n)
  - Cost array: O(n)
  - Overall dominated by DP table: O(nk)

# Code
```typescript []
const minOperations = (nums: number[], windowSize: number, numSubarrays: number): number => {
    const arrayLength = nums.length;
    const totalWindows = arrayLength - windowSize + 1;
    
    const lowerHalf = new Heap<number>((a, b) => b - a);
    const upperHalf = new Heap<number>((a, b) => a - b);
    
    let lowerSum = 0;
    let upperSum = 0;
    let lowerSize = 0;
    let upperSize = 0;
    
    const lowerDeleted = new Map<number, number>();
    const upperDeleted = new Map<number, number>();
    
    const costPerWindow: number[] = [];

    const cleanHeap = (heap: Heap<number>, deleted: Map<number, number>) => {
        while (heap.size() > 0 && deleted.has(heap.top())) {
            const val = heap.pop();
            deleted.set(val, deleted.get(val)! - 1);
            if (deleted.get(val) === 0) deleted.delete(val);
        }
    };

    const rebalanceHeaps = () => {
        while (lowerSize > upperSize + 1) {
            cleanHeap(lowerHalf, lowerDeleted);
            const val = lowerHalf.pop();
            upperHalf.push(val);
            lowerSum -= val;
            upperSum += val;
            lowerSize--;
            upperSize++;
        }
        while (lowerSize < upperSize) {
            cleanHeap(upperHalf, upperDeleted);
            const val = upperHalf.pop();
            lowerHalf.push(val);
            upperSum -= val;
            lowerSum += val;
            upperSize--;
            lowerSize++;
        }
    };

    const insertNumber = (value: number) => {
        cleanHeap(lowerHalf, lowerDeleted);
        if (lowerSize === 0 || value <= lowerHalf.top()) {
            lowerHalf.push(value);
            lowerSum += value;
            lowerSize++;
        } else {
            upperHalf.push(value);
            upperSum += value;
            upperSize++;
        }
        rebalanceHeaps();
    };

    const deleteNumber = (value: number) => {
        cleanHeap(lowerHalf, lowerDeleted);
        if (value <= lowerHalf.top()) {
            lowerDeleted.set(value, (lowerDeleted.get(value) ?? 0) + 1);
            lowerSum -= value;
            lowerSize--;
        } else {
            upperDeleted.set(value, (upperDeleted.get(value) ?? 0) + 1);
            upperSum -= value;
            upperSize--;
        }
        rebalanceHeaps();
    };

    const calculateMedianCost = (): number => {
        cleanHeap(lowerHalf, lowerDeleted);
        const median = lowerHalf.top();
        const costLeft = median * lowerSize - lowerSum;
        const costRight = upperSum - median * upperSize;
        return costLeft + costRight;
    };

    for (let i = 0; i < windowSize; i++) {
        insertNumber(nums[i]);
    }
    costPerWindow.push(calculateMedianCost());

    for (let i = windowSize; i < arrayLength; i++) {
        deleteNumber(nums[i - windowSize]);
        insertNumber(nums[i]);
        costPerWindow.push(calculateMedianCost());
    }

    const dp: number[][] = Array.from({ length: numSubarrays + 1 }, () => 
        Array(totalWindows).fill(Infinity)
    );
    
    for (let windowIndex = 0; windowIndex < totalWindows; windowIndex++) {
        dp[1][windowIndex] = costPerWindow[windowIndex];
    }

    for (let subarrayCount = 2; subarrayCount <= numSubarrays; subarrayCount++) {
        let minPreviousCost = Infinity;
        
        for (let currentWindow = 0; currentWindow < totalWindows; currentWindow++) {
            const previousWindowEnd = currentWindow - windowSize;
            if (previousWindowEnd >= 0) {
                minPreviousCost = Math.min(minPreviousCost, dp[subarrayCount - 1][previousWindowEnd]);
            }
            
            if (minPreviousCost < Infinity) {
                dp[subarrayCount][currentWindow] = minPreviousCost + costPerWindow[currentWindow];
            }
        }
    }

    return Math.min(...dp[numSubarrays]);
};
```