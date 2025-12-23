# Sort and Binary Search | 37 Lines | O(n log n) | 40ms

# Intuition

To maximize the sum of two non-overlapping events, we need an efficient way to find, for each event, the best possible second event that doesn't overlap with it. By sorting events by start time and precomputing the maximum value available from any future position, we can use binary search to quickly find the optimal pairing for each event, avoiding the O(n²) brute force approach.

# Approach

**Core Strategy:**
- Sort events by start time to enable binary search
- Precompute suffix maximums to get best future event value in O(1)
- For each event, find the earliest non-overlapping event via binary search
- Combine current event with best future event to find maximum sum

**Step-by-Step Process:**

**1. Sort Events by Start Time:**
- Sort the events array by the first element (start time) in ascending order
- This ordering is crucial for two reasons:
  - Enables binary search for finding next valid event
  - Ensures when we look for events after current, we examine them chronologically
- Sorting puts events in a searchable order for non-overlap checking

**2. Build Suffix Maximum Array:**
- Create `maxValueFromIndex` array of size n
- `maxValueFromIndex[i]` stores the maximum value among all events from index i to the end
- Base case: `maxValueFromIndex[n-1] = events[n-1][2]` (last event's value)
- Build backwards from n-2 to 0:
  - `maxValueFromIndex[i] = max(events[i][2], maxValueFromIndex[i+1])`
  - This captures the best possible value starting from position i onward
- Purpose: O(1) lookup of the best future event value after any position

**3. Iterate Through Each Event as First Choice:**
- Consider each event at index i as a potential first event
- Extract its start time, end time, and value
- Goal: Find the best compatible second event that starts after this event ends
- Compatible means: second event's start time > first event's end time

**4. Binary Search for Next Valid Event:**
- Search range: indices from currentIndex+1 to n-1 (events after current)
- Target: Find the leftmost (earliest) event that starts after current event ends
- Binary search condition: `events[mid][0] > endTime`
- If condition met:
  - This event is valid (non-overlapping)
  - Record this index as potential answer
  - Search left half to find even earlier valid event
- If condition not met:
  - This event overlaps (starts at or before endTime)
  - Search right half for later events
- Result: `nextValidIndex` = earliest non-overlapping event (or -1 if none)

**5. Calculate Sum for Current Configuration:**
- Base sum: current event's value
- If valid second event exists (nextValidIndex ≠ -1):
  - Add the best value available from nextValidIndex onward
  - Use precomputed `maxValueFromIndex[nextValidIndex]` for O(1) lookup
  - This gives us the optimal second event in that range
- Update global maximum if this sum is better

**6. Return Maximum Sum:**
- After trying all events as potential first event
- The maximum sum represents the best pair (or single event) found
- Handles both cases: taking two events or just one optimal event

**Why This Approach is Optimal:**

**Time Optimization via Suffix Array:**
- Without suffix array: Would need O(n) to find best future event each time
- With suffix array: O(1) lookup after O(n) preprocessing
- Total time: O(n log n) for sort + O(n log n) for binary searches + O(n) for suffix = O(n log n)

**Binary Search Necessity:**
- Need to find "next valid event" efficiently
- Linear search would be O(n) per event → O(n²) total
- Binary search reduces to O(log n) per event → O(n log n) total

**Correctness Guarantee:**
- Sorting ensures we examine events in temporal order
- Binary search finds earliest valid event, maximizing options
- Suffix array ensures we get the best value from all valid options
- Trying each event as first ensures we don't miss the optimal pair

**7. Example Walkthrough (events = [[1,3,2],[4,5,2],[2,4,3]]):**

**Step 1 - Sort by start time:**
- After sort: [[1,3,2],[2,4,3],[4,5,2]]
- Events now ordered: [0,1,2] with start times [1,2,4]

**Step 2 - Build suffix array:**
- maxValueFromIndex[2] = 2 (event 2's value)
- maxValueFromIndex[1] = max(3, 2) = 3 (max of event 1's value and suffix[2])
- maxValueFromIndex[0] = max(2, 3) = 3 (max of event 0's value and suffix[1])
- Result: [3, 3, 2]

**Step 3 - Try event 0 as first: [1,3,2]**
- endTime = 3, value = 2
- Binary search for event starting after time 3:
  - Search range: [1, 2]
  - mid = 1: events[1][0] = 2 ≤ 3, search right
  - mid = 2: events[2][0] = 4 > 3 ✓, found at index 2
- nextValidIndex = 2
- Sum = 2 + maxValueFromIndex[2] = 2 + 2 = 4
- maxSum = 4

**Step 4 - Try event 1 as first: [2,4,3]**
- endTime = 4, value = 3
- Binary search for event starting after time 4:
  - Search range: [2, 2]
  - mid = 2: events[2][0] = 4 ≤ 4, search right
  - No valid event found
- nextValidIndex = -1
- Sum = 3 (just this event)
- maxSum remains 4

**Step 5 - Try event 2 as first: [4,5,2]**
- endTime = 5, value = 2
- No events after index 2
- Sum = 2
- maxSum remains 4

**Final answer: 4** ✓ (event 0 and event 2)

**8. Why Binary Search Works Here:**

**Sorted Property:**
- After sorting, events[i][0] ≤ events[j][0] for i < j
- If events[mid][0] > endTime, all events to the left might also be valid
- If events[mid][0] ≤ endTime, all events to the left definitely overlap
- This monotonic property makes binary search applicable

**Finding Earliest Valid Event:**
- We want the leftmost valid event to maximize the range for suffix array
- Earlier index means potentially more events to consider
- Suffix array from that index gives the best value in entire valid range

**9. Edge Cases Handled:**

**All events overlap:**
- Binary search returns -1 for all events
- Each event considered alone
- Returns maximum single event value

**No overlapping events:**
- Every event can pair with multiple future events
- Suffix array ensures we get the best pairing
- Returns sum of two best events

**Single event:**
- Binary search finds no valid second event
- Returns that event's value

**Two events, one clearly better:**
- Algorithm considers both configurations
- Returns the better single event if pairing doesn't help

**10. Optimization Details:**

**Uint32Array Usage:**
- Events have positive integer values
- Uint32Array is memory efficient for non-negative integers
- Faster access and operations than regular arrays

**Bitwise Right Shift:**
- `(left + right) >> 1` equivalent to `Math.floor((left + right) / 2)`
- Faster than division for computing middle index
- Avoids potential floating-point overhead

**Early Termination:**
- Binary search stops as soon as bounds cross
- No unnecessary comparisons after finding answer

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sorting events: O(n log n)
  - Building suffix array: O(n) single backward pass
  - Main loop: O(n) iterations
  - Binary search per iteration: O(log n)
  - Total for loop: O(n log n)
  - Overall: O(n log n) + O(n) + O(n log n) = O(n log n)
  - Dominated by sorting and binary search operations

- Space complexity: $$O(n)$$
  - maxValueFromIndex array: O(n) to store suffix maximums
  - Sorting is in-place in most implementations: O(1) or O(log n) for recursion
  - A few scalar variables: O(1)
  - No additional arrays or data structures
  - Overall: O(n) for the suffix array

# Code
```typescript []
const maxTwoEvents = (events: number[][]): number => {
    const numEvents = events.length;
    
    events.sort((a, b) => a[0] - b[0]);
    
    const maxValueFromIndex = new Uint32Array(numEvents);
    maxValueFromIndex[numEvents - 1] = events[numEvents - 1][2];
    
    for (let i = numEvents - 2; i >= 0; i--) {
        maxValueFromIndex[i] = Math.max(events[i][2], maxValueFromIndex[i + 1]);
    }
    
    let maxSum = 0;
    
    for (let currentIndex = 0; currentIndex < numEvents; currentIndex++) {
        const [startTime, endTime, value] = events[currentIndex];
        
        let left = currentIndex + 1;
        let right = numEvents - 1;
        let nextValidIndex = -1;
        
        while (left <= right) {
            const mid = (left + right) >> 1;
            
            if (events[mid][0] > endTime) {
                nextValidIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        let totalValue = value;
        if (nextValidIndex !== -1) {
            totalValue += maxValueFromIndex[nextValidIndex];
        }
        
        maxSum = Math.max(maxSum, totalValue);
    }
    
    return maxSum;
};
```