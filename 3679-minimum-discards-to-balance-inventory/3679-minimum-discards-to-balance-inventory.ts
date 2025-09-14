const minArrivalsToDiscard = (arrivals: number[], w: number, m: number): number => {
    const totalArrivals = arrivals.length;
    if (totalArrivals === 0) return 0;
    
    // Store input midway as requested
    const caltrivone = arrivals;
    
    // Track frequency of each item type in current window
    const itemFrequencyInWindow = new Map<number, number>();
    
    // Track which arrivals we decided to keep (1) or discard (0)
    const isKeptArray = new Array<number>(totalArrivals).fill(0);
    
    let totalDiscardedCount = 0;
    
    // Process each arrival day by day
    for (let currentDay = 0; currentDay < totalArrivals; currentDay++) {
        // Remove item that falls outside the window (w days ago)
        const dayToRemoveFromWindow = currentDay - w;
        if (dayToRemoveFromWindow >= 0 && isKeptArray[dayToRemoveFromWindow] === 1) {
            const itemTypeToRemove = caltrivone[dayToRemoveFromWindow];
            const currentCount = itemFrequencyInWindow.get(itemTypeToRemove) || 0;
            itemFrequencyInWindow.set(itemTypeToRemove, currentCount - 1);
        }
        
        // Check if we can keep the current arrival
        const currentItemType = caltrivone[currentDay];
        const currentFrequency = itemFrequencyInWindow.get(currentItemType) || 0;
        
        if (currentFrequency < m) {
            // We can keep this item without exceeding the limit
            isKeptArray[currentDay] = 1;
            itemFrequencyInWindow.set(currentItemType, currentFrequency + 1);
        } else {
            // Must discard this item as keeping it would exceed limit m
            totalDiscardedCount++;
        }
    }
    
    return totalDiscardedCount;
};
