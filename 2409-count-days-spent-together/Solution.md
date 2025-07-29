# [TypeScript] Date Range Overlap | 24 Lines | O(1) | 0ms

# Intuition
To find out how many days Alice and Bob are in Rome together, we need to calculate the overlapping range of their stay dates.

# Approach
1. Convert the dates in "MM-DD" format to day-of-year integers using a helper function.
2. Compute the maximum of the start dates and the minimum of the end dates—this gives the overlapping period.
3. If there is an overlap, return the length of it; otherwise, return 0.

# Complexity
- Time complexity:  
  $$O(1)$$ – Only a constant number of operations are performed regardless of input.

- Space complexity:  
  $$O(1)$$ – No additional space proportional to input size is used.

# Code
```typescript
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const dateToDayOfYear = (date: string): number => {
    const month = parseInt(date.slice(0, 2), 10);
    const day = parseInt(date.slice(3, 5), 10);
    let dayOfYear = day;
    for (let i = 0; i < month - 1; i++) {
        dayOfYear += daysInMonth[i];
    }
    return dayOfYear;
};

const countDaysTogether = (
    arriveAlice: string,
    leaveAlice: string,
    arriveBob: string,
    leaveBob: string
): number => {
    const aliceStart = dateToDayOfYear(arriveAlice);
    const aliceEnd = dateToDayOfYear(leaveAlice);
    const bobStart = dateToDayOfYear(arriveBob);
    const bobEnd = dateToDayOfYear(leaveBob);

    const overlapStart = Math.max(aliceStart, bobStart);
    const overlapEnd = Math.min(aliceEnd, bobEnd);

    return Math.max(0, overlapEnd - overlapStart + 1);
};
```