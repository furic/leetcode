# [TypeScript] Sweep Line for Intervals | 30 Lines | O(n log n) |

# Intuition
To prevent interval overlaps within groups, we need to determine the maximum number of overlapping intervals at any given time — this dictates the minimum number of required groups.

# Approach
We use a sweep line algorithm:
1. Extract and sort all start times and end times.
2. Traverse both sorted arrays:
   - When a new interval starts before the earliest current one ends, we need a new group.
   - Otherwise, an interval ends, freeing up a group.
3. Track the maximum number of concurrent intervals seen during the traversal.

# Complexity
- Time complexity:  
  $$O(n \log n)$$ – due to sorting the start and end times.

- Space complexity:  
  $$O(n)$$ – for storing start and end arrays.

# Code
```typescript
const minGroups = (intervals: number[][]): number => {
    const [startTimes, endTimes] = intervals.reduce(
        ([starts, ends], [start, end]) => {
            starts.push(start);
            ends.push(end);
            return [starts, ends];
        },
        [[], []] as [number[], number[]]
    );

    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);

    let activeGroups = 0;
    let maxGroups = 0;
    let startPointer = 0;
    let endPointer = 0;

    while (startPointer < intervals.length) {
        if (startTimes[startPointer] <= endTimes[endPointer]) {
            activeGroups++;
            maxGroups = Math.max(maxGroups, activeGroups);
            startPointer++;
        } else {
            activeGroups--;
            endPointer++;
        }
    }

    return maxGroups;
};
```