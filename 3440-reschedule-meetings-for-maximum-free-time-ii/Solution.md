# Two Pass Gap Analysis | 52 Lines | O(n) | 4ms

# Intuition
To maximize free time, we need to remove one meeting and potentially move it elsewhere to create the largest possible continuous gap. The key insight is that removing a meeting creates a gap, but we might be able to place that meeting in an existing gap elsewhere, effectively "merging" the gaps around the removed meeting. We need to consider both directions: moving meetings left or right.

# Approach
I'll use a two-pass approach to consider all possible rearrangements:

1. **Gap Analysis**: For each meeting, calculate the gaps immediately to its left and right. When we remove a meeting, these gaps can potentially be merged.

2. **First Pass (Left-to-Right)**: For each meeting, consider moving it to a gap we've seen to the left:
   - Track the maximum gap seen so far from the left
   - If the current meeting can fit in a previous gap, we can merge the left and right gaps around the current position
   - Otherwise, we can only combine the immediate left and right gaps

3. **Second Pass (Right-to-Left)**: Similarly, for each meeting, consider moving it to a gap we've seen to the right:
   - Track the maximum gap seen so far from the right
   - Apply the same logic but in reverse direction

4. **Optimization Strategy**: The maximum free time is achieved by either:
   - Moving a meeting to fit in an existing gap (enabling gap merging)
   - Simply removing a meeting and combining adjacent gaps

This approach ensures we consider all possible ways to rearrange exactly one meeting to maximize continuous free time.

# Complexity
- Time complexity: $$O(n)$$
  - We make two linear passes through the meetings array
  - Each operation within the loops takes constant time
  - No nested loops or complex operations

- Space complexity: $$O(1)$$
  - We only use a constant amount of extra variables
  - No additional data structures that scale with input size
  - All computations are done in-place

# Code
```typescript []
const maxFreeTime = (eventTime: number, startTime: number[], endTime: number[]): number => {
    const totalMeetings = endTime.length;
    let maxFreeTimePossible = 0;
    
    let maxLeftGapSeen = 0;
    
    for (let meetingIndex = 0; meetingIndex < totalMeetings; meetingIndex++) {
        const currentMeetingDuration = endTime[meetingIndex] - startTime[meetingIndex];
        
        const leftBoundary = meetingIndex === 0 ? 0 : endTime[meetingIndex - 1];
        const rightBoundary = meetingIndex === totalMeetings - 1 ? eventTime : startTime[meetingIndex + 1];
        
        const leftGap = startTime[meetingIndex] - leftBoundary;
        const rightGap = rightBoundary - endTime[meetingIndex];
        
        if (currentMeetingDuration <= maxLeftGapSeen) {
            const mergedGapSize = rightBoundary - leftBoundary;
            maxFreeTimePossible = Math.max(maxFreeTimePossible, mergedGapSize);
        } else {
            const combinedGaps = leftGap + rightGap;
            maxFreeTimePossible = Math.max(maxFreeTimePossible, combinedGaps);
        }
        
        maxLeftGapSeen = Math.max(maxLeftGapSeen, leftGap);
    }
    
    let maxRightGapSeen = 0;
    
    for (let meetingIndex = totalMeetings - 1; meetingIndex >= 0; meetingIndex--) {
        const currentMeetingDuration = endTime[meetingIndex] - startTime[meetingIndex];
        
        const leftBoundary = meetingIndex === 0 ? 0 : endTime[meetingIndex - 1];
        const rightBoundary = meetingIndex === totalMeetings - 1 ? eventTime : startTime[meetingIndex + 1];
        
        const leftGap = startTime[meetingIndex] - leftBoundary;
        const rightGap = rightBoundary - endTime[meetingIndex];
        
        if (currentMeetingDuration <= maxRightGapSeen) {
            const mergedGapSize = rightBoundary - leftBoundary;
            maxFreeTimePossible = Math.max(maxFreeTimePossible, mergedGapSize);
        } else {
            const combinedGaps = leftGap + rightGap;
            maxFreeTimePossible = Math.max(maxFreeTimePossible, combinedGaps);
        }
        
        maxRightGapSeen = Math.max(maxRightGapSeen, rightGap);
    }
    
    return maxFreeTimePossible;
};
```