const minimumDifference = (nums: number[]): number => {
    const totalLength = nums.length;
    const n = totalLength / 3;

    // part1Sums[i]: minimal sum of n elements from nums[0..n+i-1]
    const part1Sums: number[] = new Array(n + 1).fill(0);

    const maxHeap = new MaxPriorityQueue<number>();
    let leftSum = 0;

    // Initialize with first n elements
    for (let i = 0; i < n; i++) {
        leftSum += nums[i];
        maxHeap.enqueue(nums[i]);
    }
    part1Sums[0] = leftSum;

    // Continue adding elements while keeping n smallest
    for (let i = n; i < 2 * n; i++) {
        leftSum += nums[i];
        maxHeap.enqueue(nums[i]);
        leftSum -= maxHeap.dequeue();
        part1Sums[i - n + 1] = leftSum;
    }

    const minHeap = new MinPriorityQueue<number>();
    let rightSum = 0;

    // Initialize with last n elements
    for (let i = totalLength - 1; i >= 2 * n; i--) {
        rightSum += nums[i];
        minHeap.enqueue(nums[i]);
    }

    let minDifference = part1Sums[n] - rightSum;

    // Iterate backwards, updating rightSum while keeping n largest
    for (let i = 2 * n - 1; i >= n; i--) {
        rightSum += nums[i];
        minHeap.enqueue(nums[i]);
        rightSum -= minHeap.dequeue();

        const leftIndex = i - n;
        const currentDifference = part1Sums[leftIndex] - rightSum;
        minDifference = Math.min(minDifference, currentDifference);
    }

    return minDifference;
};