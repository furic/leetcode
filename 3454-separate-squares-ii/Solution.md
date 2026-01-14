# Sweep Line with Interval Merging | 85 Lines | O(n² log n) | 2283ms

# Intuition

When squares overlap, we must count the overlapped area only once. Use a sweep line algorithm moving bottom-to-top, tracking active x-intervals at each y-level and merging overlaps. Calculate total covered area, then find where accumulated area reaches half.

# Approach

**Sweep Line Algorithm:**
1. Create events for square bottoms (add interval) and tops (remove interval)
2. Sort events by y-coordinate
3. Process events bottom-to-top, tracking active x-intervals
4. For each horizontal slice, merge overlapping x-intervals to get true width
5. Accumulate area = height × merged_width

**Interval Merging:**
- Sort intervals by left endpoint
- Merge overlapping intervals to avoid double-counting
- Return total width of merged intervals

**Finding Split Point:**
- Process slices until accumulated area ≥ totalArea/2
- Within that slice, calculate exact y: startY + remainingArea/width

**Example: squares=[[0,0,2],[1,1,1]]**

Events sorted by y:
- y=0: add [0,2]
- y=1: add [1,2], remove [0,2] (order matters)
- y=2: remove [1,2]

Wait, that's not right. Let me reconsider:
- y=0: bottom of [0,0,2], add interval [0,2]
- y=1: bottom of [1,1,1], add interval [1,2]
- y=2: top of [1,1,1], remove interval [1,2]
- y=2: top of [0,0,2], remove interval [0,2]

Slices:
- [0,1): active=[0,2], width=2, area=1×2=2
- [1,2): active=[0,2],[1,2] → merged [0,2], width=2, area=1×2=2

Total area=4, half=2
After slice [0,1): accumulated=2 ≥ 2
Split at y=1.0 ✓

# Complexity

- Time complexity: $$O(n^2 \log n)$$
  - Create events: O(n)
  - Sort events: O(n log n)
  - Process events: O(n)
  - Per event: merge intervals O(n log n)
  - Overall: O(n² log n)

- Space complexity: $$O(n)$$
  - Events array: O(n)
  - Active intervals: O(n)
  - Slices array: O(n)

# Code
```typescript []
const separateSquares = (squares: number[][]): number => {
    const sweepLineEvents: [number, number, number, number][] = [];
    
    for (const [x, y, sideLength] of squares) {
        sweepLineEvents.push([y, 1, x, x + sideLength]);
        sweepLineEvents.push([y + sideLength, -1, x, x + sideLength]);
    }

    sweepLineEvents.sort((a, b) => 
        a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]
    );

    const calculateUnionWidth = (intervals: [number, number][]): number => {
        if (intervals.length === 0) return 0;
        
        intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        
        let totalCoveredWidth = 0;
        let currentRightmost = -Infinity;
        
        for (const [left, right] of intervals) {
            if (left > currentRightmost) {
                totalCoveredWidth += right - left;
                currentRightmost = right;
            } else if (right > currentRightmost) {
                totalCoveredWidth += right - currentRightmost;
                currentRightmost = right;
            }
        }
        
        return totalCoveredWidth;
    };

    let activeXIntervals: [number, number][] = [];
    let previousY = sweepLineEvents[0][0];
    let totalCoveredArea = 0;
    
    const horizontalSlices: [number, number, number][] = [];

    for (const [currentY, eventType, xLeft, xRight] of sweepLineEvents) {
        if (currentY > previousY && activeXIntervals.length > 0) {
            const sliceHeight = currentY - previousY;
            const sliceWidth = calculateUnionWidth([...activeXIntervals]);
            
            horizontalSlices.push([previousY, sliceHeight, sliceWidth]);
            totalCoveredArea += sliceHeight * sliceWidth;
        }

        if (eventType === 1) {
            activeXIntervals.push([xLeft, xRight]);
        } else {
            const indexToRemove = activeXIntervals.findIndex(
                ([left, right]) => left === xLeft && right === xRight
            );
            if (indexToRemove !== -1) {
                activeXIntervals.splice(indexToRemove, 1);
            }
        }

        previousY = currentY;
    }

    const halfTotalArea = totalCoveredArea / 2;
    let accumulatedArea = 0;

    for (const [sliceStartY, sliceHeight, sliceWidth] of horizontalSlices) {
        const sliceArea = sliceHeight * sliceWidth;
        
        if (accumulatedArea + sliceArea >= halfTotalArea) {
            const remainingAreaNeeded = halfTotalArea - accumulatedArea;
            const additionalHeight = remainingAreaNeeded / sliceWidth;
            return sliceStartY + additionalHeight;
        }
        
        accumulatedArea += sliceArea;
    }

    return previousY;
};
```