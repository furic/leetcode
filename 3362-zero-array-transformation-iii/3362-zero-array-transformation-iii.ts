const maxRemoval = (nums: number[], queries: number[][]): number => {
    // Sort queries by their start index
    queries.sort((a, b) => a[0] - b[0]);

    const queryHeap = new MaxPriorityQueue<number>(); // Tracks query end indices
    const deferredDecrements: number[] = new Array(nums.length + 1).fill(0); // Range updates
    let activeDecrements = 0; // Number of active 1-decrements at current index
    let queryIndex = 0; // Pointer to the next query to process

    for (let i = 0; i < nums.length; i++) {
        // Apply any deferred decrement ending at this index
        activeDecrements += deferredDecrements[i];

        // Push all queries that start at this index into the heap
        while (queryIndex < queries.length && queries[queryIndex][0] === i) {
            queryHeap.enqueue(queries[queryIndex][1]); // Push query end index
            queryIndex++;
        }

        // Try to apply more queries from the heap to meet nums[i]
        while (activeDecrements < nums[i] && queryHeap.size() && queryHeap.front() >= i) {
            activeDecrements++;
            deferredDecrements[queryHeap.pop() + 1]--; // Reverse the increment after the range
        }

        // If still not enough decrements to reduce nums[i] to 0
        if (activeDecrements < nums[i]) {
            return -1;
        }
    }

    // Remaining queries in the heap are unused and removable
    return queryHeap.size();
};