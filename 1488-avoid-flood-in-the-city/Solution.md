# Greedy Dry Day Selection | 52 Lines | O(n²) | 37ms

# Intuition
We need to strategically use dry days to prevent floods. A flood occurs when it rains on an already-full lake. The key is to track which lakes are full and use available dry days to drain lakes just before they would flood.

# Approach
**Greedy Strategy with Lookahead:**
- Process days sequentially, tracking full lakes and available dry days
- When it rains on a full lake, we must have used a dry day between the previous rain and now to drain it
- Greedily select the earliest available dry day that occurs after the lake was previously filled

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - Create result array defaulting all days to 1 (arbitrary lake for dry days)
   - Map `fullLakes` to track which lakes are full and when they were last filled
   - Array `availableDryDays` to store indices of days with no rain
   - Pointer `nextUnusedDryDayIndex` to optimize searching for available dry days

2. **Process Each Day:**
   - **If rains[day] == 0:** Record this as an available dry day
   - **If rains[day] > 0:** Rain on specific lake
     - Set result[day] = -1 (can't choose on rainy days)
     - Check if lake is already full

3. **Handle Full Lake Scenario:**
   - Find when the lake was previously filled (previousRainDay)
   - Search for first unused dry day after previousRainDay
   - If no such dry day exists → flood is inevitable, return []
   - Otherwise, assign that dry day to drain this lake
   - Mark the dry day as used by setting it to -1 in availableDryDays
   - Update nextUnusedDryDayIndex if we used the next sequential dry day

4. **Update Lake Status:**
   - Mark the lake as full (or refilled) with current day

**Key Optimizations:**
- Track `nextUnusedDryDayIndex` to skip already-used dry days in future searches
- Mark used dry days as -1 rather than removing them (maintains indices)
- Only search forward from nextUnusedDryDayIndex to avoid redundant checks

**Why Greedy Works:**
- We only need to drain a lake before it rains again on it
- Using the earliest available dry day maximizes flexibility for future draining
- If we can't find a dry day between two rains on the same lake, no solution exists

# Complexity
- Time complexity: $$O(n^2)$$ in worst case - for each rain day, we may scan all dry days
- Space complexity: $$O(n)$$ for storing full lakes and dry days

# Code
```typescript
const avoidFlood = (rains: number[]): number[] => {
    const totalDays = rains.length;
    const result = rains.map(() => 1);
    
    const fullLakes = new Map<number, number>();
    const availableDryDays: number[] = [];
    let nextUnusedDryDayIndex = 0;

    for (let day = 0; day < totalDays; day++) {
        const lakeNumber = rains[day];

        if (lakeNumber === 0) {
            availableDryDays.push(day);
        } else {
            result[day] = -1;

            if (fullLakes.has(lakeNumber)) {
                const previousRainDay = fullLakes.get(lakeNumber)!;

                let dryDayIndex = nextUnusedDryDayIndex;
                while (
                    dryDayIndex < availableDryDays.length && 
                    availableDryDays[dryDayIndex] < previousRainDay
                ) {
                    dryDayIndex++;
                }

                if (dryDayIndex === availableDryDays.length) {
                    return [];
                }

                const chosenDryDay = availableDryDays[dryDayIndex];
                result[chosenDryDay] = lakeNumber;

                availableDryDays[dryDayIndex] = -1;

                if (nextUnusedDryDayIndex === dryDayIndex) {
                    nextUnusedDryDayIndex++;
                }
            }

            fullLakes.set(lakeNumber, day);
        }
    }

    return result;
};
```