# Last Seen Index Tracking | 10 Lines | O(n) | 0ms

# Intuition
The closest valid pair `(i, j)` must have either a `1` immediately followed by a nearby `2`, or vice versa. By tracking the most recent index of each value, we can compute the gap between any `1` and the last `2` seen (or any `2` and the last `1` seen) in a single pass.

# Approach
- Maintain `lastOneIndex` and `lastTwoIndex` initialised to `-100` (far enough back given constraints).
- Initialise `minIndexDiff = 100` (safe upper bound since array length ≤ 100).
- Iterate through `nums`, skipping `0`s:
  - On seeing `1` at index `i`: update `minIndexDiff = min(minIndexDiff, i - lastTwoIndex)` — this captures the distance to the most recent `2` before this `1`. Then update `lastOneIndex = i`.
  - On seeing `2` at index `i`: update `minIndexDiff = min(minIndexDiff, i - lastOneIndex)` — captures the distance to the most recent `1` before this `2`. Then update `lastTwoIndex = i`.
- Both orderings (`1` before `2` and `2` before `1`) are covered because whichever comes second checks the last seen index of the other.
- Return `minIndexDiff` if updated, else `-1`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$ — three scalar variables.

# Code
```typescript []
const minAbsoluteDifference = (nums: number[]): number => {
    let minIndexDiff = 100;
    let lastOneIndex = -100, lastTwoIndex = -100;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) continue;
        if (nums[i] === 1) {
            minIndexDiff = Math.min(minIndexDiff, i - lastTwoIndex);
            lastOneIndex = i;
        } else {
            minIndexDiff = Math.min(minIndexDiff, i - lastOneIndex);
            lastTwoIndex = i;
        }
    }
    return minIndexDiff === 100 ? -1 : minIndexDiff;
};
```