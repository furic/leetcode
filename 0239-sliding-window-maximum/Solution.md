# Monotonic Deque Sliding Window Max | 13 Lines | O(n) | 16ms

# Intuition
We need the maximum of each k-length window in O(n) total. A monotonic decreasing deque of indices maintains the invariant that the front is always the index of the current window's maximum — without rescanning the window each step.

# Approach
- Use a fixed-size `Int32Array` as a circular deque storing indices, with `head` and `tail` pointers.
- For each index `i`:
  - **Evict stale front:** If `deque[head] === i - k`, the front index has slid out of the current window — advance `head`.
  - **Maintain decreasing invariant:** While the back of the deque holds an index whose value is less than `nums[i]`, pop it (`tail--`). A smaller element behind `nums[i]` can never be the window max while `nums[i]` is in the window.
  - **Push current index** to the back (`deque[tail++] = i`).
  - **Emit result:** Once `i >= k - 1` (first full window reached), `nums[deque[head]]` is the current window's maximum.
- Each index is pushed and popped at most once, giving amortised O(1) per element.

# Complexity
- Time complexity: $$O(n)$$ — each element enters and leaves the deque at most once.

- Space complexity: $$O(k)$$ — the deque holds at most `k` indices at any time (though allocated as `n`).

# Code
```typescript []
const maxSlidingWindow = (nums: number[], k: number): number[] => {
    const result: number[] = [];
    const deque = new Int32Array(nums.length);
    let head = 0;
    let tail = 0;

    for (let i = 0; i < nums.length; i++) {
        if (head < tail && deque[head] === i - k) head++;

        while (head < tail && nums[deque[tail - 1]] < nums[i]) tail--;

        deque[tail++] = i;

        if (i >= k - 1) result.push(nums[deque[head]]);
    }

    return result;
};
```