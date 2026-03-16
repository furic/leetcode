# Counting Sort Alternate Pick | 14 Lines | O(n) | 11ms

# Intuition
To maximize the sum of minimums, pair adjacent elements in sorted order — `(nums[0], nums[1]), (nums[2], nums[3]), ...`. The minimum of each sorted pair is always the left element. Instead of sorting in O(n log n), we use counting sort since values are bounded to `[-10000, 10000]`.

# Approach
- Use a frequency array of size `20001` (offset by `10000` to handle negatives).
- Count occurrences of each value in O(n).
- Iterate through the frequency array from smallest to largest value, consuming elements one at a time. Toggle a `takingMin` flag on each element consumed — in sorted order, odd-positioned elements (1st, 3rd, 5th...) are always the minimums of their pairs.
- When `takingMin` is true, add the current value to the sum.
- The `while (freq[i] > 0)` inner loop handles duplicate values correctly — each duplicate is consumed one at a time, alternating the flag.

# Complexity
- Time complexity: $$O(n + V)$$ where $$V = 20001$$ is the value range — effectively $$O(n)$$ since $$V$$ is constant.

- Space complexity: $$O(V) = O(1)$$ — fixed-size frequency array.

# Code
```typescript []
const arrayPairSum = (nums: number[]): number => {
    const OFFSET = 10000;
    const freq = new Array(2 * OFFSET + 1).fill(0);
    for (const num of nums) freq[num + OFFSET]++;

    let sum = 0;
    let takingMin = true;
    for (let i = 0; i <= 2 * OFFSET; i++) {
        while (freq[i] > 0) {
            if (takingMin) sum += i - OFFSET;
            takingMin = !takingMin;
            freq[i]--;
        }
    }

    return sum;
};
```