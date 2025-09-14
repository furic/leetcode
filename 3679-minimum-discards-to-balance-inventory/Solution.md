# Sliding Window Frequency Control | 34 Lines | O(n) | 36ms

# Intuition
This is a sliding window problem where we need to maintain at most m occurrences of each item type within any w-day window. The key insight is to process arrivals sequentially and maintain a frequency map of the current window. For each arrival, we either keep it (if it doesn't violate the constraint) or discard it (if keeping it would exceed the limit m for that item type in the current window).

# Approach
I'll use a sliding window technique with frequency tracking:

1. **Window Management**: Maintain a sliding window of size w that represents the most recent w days. As we process each day, remove items that fall outside this window.

2. **Frequency Tracking**: Use a hash map to track the frequency of each item type currently in the window (only counting kept items).

3. **Greedy Decision**: For each arrival:
   - Check if keeping this item would exceed the limit m for its type in the current window
   - If yes, we must discard it and increment our discard counter
   - If no, we keep it and update our frequency map

4. **Window Updates**: Before processing each day's arrival:
   - Remove items from w days ago (if any) from our frequency tracking
   - Only count items that were actually kept, not discarded ones

5. **Optimal Strategy**: The greedy approach works because discarding an item never helps future decisions - keeping items when possible is always optimal.

# Complexity
- Time complexity: $$O(n)$$
  - Process each arrival exactly once: O(n)
  - Each day involves constant-time operations: map lookups, updates, and arithmetic
  - Window management is O(1) per day since we only remove one item per iteration

- Space complexity: $$O(k)$$
  - Frequency map stores at most k distinct item types where k ≤ n
  - isKeptArray stores n boolean values: O(n)
  - Overall space is O(n + k) = O(n) in worst case

# Code
```typescript []
const minArrivalsToDiscard = (arrivals: number[], w: number, m: number): number => {
    const totalArrivals = arrivals.length;
    if (totalArrivals === 0) return 0;
    
    const caltrivone = arrivals;
    
    const itemFrequencyInWindow = new Map<number, number>();
    
    const isKeptArray = new Array<number>(totalArrivals).fill(0);
    
    let totalDiscardedCount = 0;
    
    for (let currentDay = 0; currentDay < totalArrivals; currentDay++) {
        const dayToRemoveFromWindow = currentDay - w;
        if (dayToRemoveFromWindow >= 0 && isKeptArray[dayToRemoveFromWindow] === 1) {
            const itemTypeToRemove = caltrivone[dayToRemoveFromWindow];
            const currentCount = itemFrequencyInWindow.get(itemTypeToRemove) || 0;
            itemFrequencyInWindow.set(itemTypeToRemove, currentCount - 1);
        }
        
        const currentItemType = caltrivone[currentDay];
        const currentFrequency = itemFrequencyInWindow.get(currentItemType) || 0;
        
        if (currentFrequency < m) {
            isKeptArray[currentDay] = 1;
            itemFrequencyInWindow.set(currentItemType, currentFrequency + 1);
        } else {
            totalDiscardedCount++;
        }
    }
    
    return totalDiscardedCount;
};
```