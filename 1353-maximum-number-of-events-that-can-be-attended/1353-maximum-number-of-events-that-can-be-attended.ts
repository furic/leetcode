const maxEvents = (events: number[][]): number => {
    // Sort events by end day (greedy: attend events that end sooner first)
    events.sort((eventA, eventB) => eventA[1] - eventB[1]);
    
    // Find the maximum end day to determine array size
    const maxEndDay = events[events.length - 1][1];
    const totalDays = maxEndDay + 2; // +2 for boundary (0-indexed + sentinel)
    
    // Union-Find structure: nextAvailableDay[i] points to next available day >= i
    const nextAvailableDay: Uint32Array = new Uint32Array(totalDays);
    
    // Initialize: each day initially points to itself (available)
    for (let day = 0; day < totalDays; day++) {
        nextAvailableDay[day] = day;
    }
    
    // Union-Find with path compression: find next available day >= currentDay
    const findNextAvailableDay = (currentDay: number): number => {
        if (nextAvailableDay[currentDay] !== currentDay) {
            // Path compression: update parent to root for faster future queries
            nextAvailableDay[currentDay] = findNextAvailableDay(nextAvailableDay[currentDay]);
        }
        return nextAvailableDay[currentDay];
    };
    
    let attendedEventsCount = 0;
    
    // Process each event in order of end day (earliest deadline first)
    for (const [startDay, endDay] of events) {
        // Find the earliest available day within the event's time window
        const availableDay = findNextAvailableDay(startDay);
        
        // If we can attend this event (available day is within the event's range)
        if (availableDay <= endDay) {
            attendedEventsCount++;
            
            // Mark this day as used by pointing it to the next day
            // This creates a "union" operation that skips over used days
            nextAvailableDay[availableDay] = findNextAvailableDay(availableDay + 1);
        }
        // If availableDay > endDay, we cannot attend this event (skip it)
    }
    
    return attendedEventsCount;
};