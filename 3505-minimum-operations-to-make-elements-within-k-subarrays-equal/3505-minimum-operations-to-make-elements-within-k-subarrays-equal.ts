const minOperations = (nums: number[], windowSize: number, numSubarrays: number): number => {
    const arrayLength = nums.length;
    const totalWindows = arrayLength - windowSize + 1;
    
    // Built-in Heap - requires comparator
    const lowerHalf = new Heap<number>((a, b) => b - a); // Max heap
    const upperHalf = new Heap<number>((a, b) => a - b); // Min heap
    
    // Manual tracking (built-in Heap doesn't have these)
    let lowerSum = 0;
    let upperSum = 0;
    let lowerSize = 0;
    let upperSize = 0;
    
    // Lazy deletion tracking
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

    // Build initial window
    for (let i = 0; i < windowSize; i++) {
        insertNumber(nums[i]);
    }
    costPerWindow.push(calculateMedianCost());

    // Slide window and calculate costs
    for (let i = windowSize; i < arrayLength; i++) {
        deleteNumber(nums[i - windowSize]);
        insertNumber(nums[i]);
        costPerWindow.push(calculateMedianCost());
    }

    // DP: dp[k][i] = min cost using k subarrays up to window i
    const dp: number[][] = Array.from({ length: numSubarrays + 1 }, () => 
        Array(totalWindows).fill(Infinity)
    );
    
    // Base case: using exactly 1 subarray
    for (let windowIndex = 0; windowIndex < totalWindows; windowIndex++) {
        dp[1][windowIndex] = costPerWindow[windowIndex];
    }

    // Fill DP table
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