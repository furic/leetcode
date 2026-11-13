const countNonDecreasingSubarrays = (nums: number[], k: number): number => {
    const n = nums.length;

    // Monotonic deque of "plateau" start indices, left to right: plateauStarts[front..back).
    // A plateau is a run of elements whose prefix max (within the window) is the value at its start index.
    const plateauStarts = new Int32Array(n);
    let front = n, back = n;

    let count = 0;
    let cost = 0;        // operations needed to make nums[left..right] non-decreasing
    let right = n - 1;   // window is nums[left..right]

    for (let left = n - 1; left >= 0; left--) {
        const value = nums[left];

        // The new left element raises every plateau whose value <= value up to `value`
        while (front < back && nums[plateauStarts[front]] <= value) {
            const plateauStart = plateauStarts[front++];
            const plateauEnd = front < back ? plateauStarts[front] : right + 1;
            cost += (value - nums[plateauStart]) * (plateauEnd - plateauStart);
        }
        plateauStarts[--front] = left;

        // Shrink from the right until the window is affordable; the removed element takes its cost with it
        while (cost > k) {
            cost -= nums[plateauStarts[back - 1]] - nums[right];
            if (plateauStarts[back - 1] === right) back--; // that plateau is now empty
            right--;
        }

        count += right - left + 1; // every subarray starting at `left` and ending within the window works
    }

    return count;
};