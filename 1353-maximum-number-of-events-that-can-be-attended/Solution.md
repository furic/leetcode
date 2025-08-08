# Union Find Greedy Scheduling | 35 Lines | O(nlogn) | 61ms

# Intuition
This is a classic greedy scheduling problem. The key insight is that we should prioritize events that end sooner, as they have fewer opportunities to be attended later. If we sort events by their end day and always try to attend each event on its earliest possible day, we can maximize the total number of events attended. The challenge is efficiently finding the next available day within each event's time window.

# Approach
I'll use a greedy approach combined with Union-Find for efficient day tracking:

1. **Greedy Strategy**: Sort events by end day (earliest deadline first). This ensures we handle urgent events before they become impossible to attend.

2. **Union-Find for Day Management**: Use a Union-Find data structure where each day points to the next available day. Initially, each day points to itself (available). When a day is used, it points to the next day, creating a chain that helps us skip over used days efficiently.

3. **Event Processing**: For each event in sorted order:
   - Find the earliest available day within the event's time window using Union-Find
   - If such a day exists, attend the event and mark that day as used
   - Update the Union-Find structure to skip this day in future queries

4. **Path Compression**: Implement path compression in Union-Find to ensure that finding the next available day remains efficient even as more days are used.

The Union-Find approach transforms what would be an O(n × d) solution into an O(n log n) solution by efficiently skipping over consecutive used days.

# Complexity
- Time complexity: $$O(n \log n)$$
  - Sorting events takes O(n log n)
  - Each Union-Find operation (find with path compression) takes amortized O(α(n)) ≈ O(1)
  - Processing n events with Union-Find operations: O(n × α(n)) ≈ O(n)
  - Overall dominated by sorting: O(n log n)

- Space complexity: $$O(d)$$
  - Union-Find array size is proportional to the maximum end day (d)
  - All other variables use O(1) space
  - In worst case, d can be up to the maximum value in the input

# Code
```typescript []
const maxEvents = (events: number[][]): number => {
    events.sort((eventA, eventB) => eventA[1] - eventB[1]);
    
    const maxEndDay = events[events.length - 1][1];
    const totalDays = maxEndDay + 2;
    
    const nextAvailableDay: Uint32Array = new Uint32Array(totalDays);
    
    for (let day = 0; day < totalDays; day++) {
        nextAvailableDay[day] = day;
    }
    
    const findNextAvailableDay = (currentDay: number): number => {
        if (nextAvailableDay[currentDay] !== currentDay) {
            nextAvailableDay[currentDay] = findNextAvailableDay(nextAvailableDay[currentDay]);
        }
        return nextAvailableDay[currentDay];
    };
    
    let attendedEventsCount = 0;
    
    for (const [startDay, endDay] of events) {
        const availableDay = findNextAvailableDay(startDay);
        
        if (availableDay <= endDay) {
            attendedEventsCount++;
            
            nextAvailableDay[availableDay] = findNextAvailableDay(availableDay + 1);
        }
    }
    
    return attendedEventsCount;
};
```