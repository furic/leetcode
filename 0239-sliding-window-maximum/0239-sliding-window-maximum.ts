const maxSlidingWindow = (nums: number[], k: number): number[] => {
    const result: number[] = [];
    const deque = new Int32Array(nums.length); // Stores indices; front is always the window's max
    let head = 0;
    let tail = 0;

    for (let i = 0; i < nums.length; i++) {
        // Evict front if it has slid out of the window
        if (head < tail && deque[head] === i - k) head++;

        // Maintain decreasing order: drop indices whose values are smaller than current
        while (head < tail && nums[deque[tail - 1]] < nums[i]) tail--;

        deque[tail++] = i;

        if (i >= k - 1) result.push(nums[deque[head]]);
    }

    return result;
};