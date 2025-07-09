Sliding Window for Meetings | 20 Lines | O(n) | 1ms

# Intuition
To maximize the longest continuous free period, consider rescheduling at most k consecutive meetings to eliminate or minimize occupied windows in the event timeline while preserving order and avoiding overlaps.

# Approach
1. Use a **sliding window of size k** over the meetings.
2. For each window:
   - Calculate the total occupied time within the window.
   - Compute the **earliest possible start** (0 or the end of the meeting k steps back) and **latest possible end** (event end or start of the next meeting).
   - The potential maximum free time in this window is:
     ```
     latestPossibleEnd - earliestPossibleStart - occupiedWindowTime
     ```
   - Update the global maximum.
3. Slide the window forward by removing the contribution of the earliest meeting in the window.

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(1)$$

# Code
```typescript
const maxFreeTime = (
    eventTime: number,
    k: number,
    startTime: number[],
    endTime: number[],
): number => {
    const n = startTime.length;
    let maxContinuousFreeTime = 0;
    let occupiedWindowTime = 0;
    for (let i = 0; i < n; i++) {
        occupiedWindowTime += endTime[i] - startTime[i];
        const earliestPossibleStart = i <= k - 1 ? 0 : endTime[i - k];
        const latestPossibleEnd = i === n - 1 ? eventTime : startTime[i + 1];
        const currentFreeTime = latestPossibleEnd - earliestPossibleStart - occupiedWindowTime;
        maxContinuousFreeTime = Math.max(maxContinuousFreeTime, currentFreeTime);
        if (i >= k - 1) {
            occupiedWindowTime -= endTime[i - k + 1] - startTime[i - k + 1];
        }
    }
    return maxContinuousFreeTime;
};
```
