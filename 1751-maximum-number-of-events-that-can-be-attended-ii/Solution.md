# DP + Binary Search |  thirty Lines | O(k n log n) | 80ms

# Intuition
We want to select up to k non-overlapping events with the maximum total value. Since events have start and end days, a greedy approach is insufficient, making DP with binary search ideal.

# Approach
1. Sort events by start day.
2. Precompute `findNextEventIndex` using binary search to find the next non-overlapping event for any given event efficiently.
3. Use bottom-up DP:
   - `dp[remaining][index]` = max value using `remaining` slots starting at `index`.
   - Choice:
     - Skip current event: `dp[remaining][index + 1]`.
     - Take current event: `value + dp[remaining - 1][nextIndex]`.
4. Return `dp[k][0]` as the maximum value using at most k events.

# Complexity
- Time complexity: $$O(k \cdot n \log n)$$ due to binary search inside DP.
- Space complexity: $$O(k \cdot n)$$ for the DP table.

# Code
```typescript
const maxValue = (events: number[][], k: number): number => {
    const n = events.length;
    events.sort((a, b) => a[0] - b[0]);
    const findNextEventIndex = (targetEnd: number): number => {
        let left = 0, right = n;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (events[mid][0] <= targetEnd) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    };
    const dp: number[][] = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
    for (let index = n - 1; index >= 0; index--) {
        const [start, end, value] = events[index];
        const nextIndex = findNextEventIndex(end);
        for (let remaining = 1; remaining <= k; remaining++) {
            dp[remaining][index] = Math.max(
                dp[remaining][index + 1],
                value + dp[remaining - 1][nextIndex]
            );
        }
    }
    return dp[k][0];
};
```