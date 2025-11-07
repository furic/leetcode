# Binary Search with Greedy Placement | 70 Lines | O(n log(sum + k)) | 86ms

# Intuition
We want to maximize the minimum power across all cities. This is a classic "binary search on answer" problem - we can check if a target minimum power is achievable, so we binary search for the maximum achievable minimum. The key challenge is efficiently checking feasibility and optimally placing new stations.

# Approach
**Binary Search with Difference Array Optimization:**
- Binary search on the minimum power value
- For each candidate, use greedy placement to check feasibility
- Use difference array for O(1) range updates when placing stations
- Greedy strategy: place stations as far right as possible to help future cities

**Step-by-Step Process:**

1. **Precompute Initial Power Distribution:**
   - Use difference array to efficiently calculate each city's initial power
   - Station at position i affects cities [i-r, i+r]
   - Build difference array: `powerDiff[start]++, powerDiff[end+1]--`
   - Prefix sum of powerDiff gives actual power at each city

2. **Binary Search Setup:**
   - `minPossiblePower`: lowest initial power among cities
   - `maxPossiblePower`: sum of all stations + k (upper bound)
   - Search for maximum achievable minimum power

3. **Feasibility Check (canAchieveMinPower):**
   - Given target minimum power, check if achievable with ≤ k stations
   - Process cities left to right (greedy order)
   
   **For each city:**
   - Calculate current power using difference array
   - If power < target: need to add stations
   - Calculate deficit: `stationsNeeded = target - currentPower`
   - Check if we have enough stations remaining
   
   **Optimal Placement:**
   - Place new stations at position `cityIndex + r` (rightmost in range)
   - Why? Maximizes coverage for future cities (to the right)
   - Update difference array to reflect new stations
   - Deduct from `remainingStations`

4. **Difference Array Mechanics:**
   - `powerDiff[i]` tracks change in power at position i
   - Prefix sum gives actual power: `power[i] = Σ powerDiff[0..i]`
   - Range update [L, R]: `powerDiff[L]++, powerDiff[R+1]--`
   - Enables O(1) updates instead of O(n) array modifications

5. **Binary Search Update:**
   - If feasible: try higher minimum (`minPossiblePower = mid + 1`)
   - If not feasible: try lower minimum (`maxPossiblePower = mid - 1`)
   - Track best feasible answer found

6. **Return Maximum Achievable Minimum:**
   - After binary search converges, return best answer

**Why This Works:**

**Greedy Placement Optimality:**
- Processing left to right ensures we fix deficits as we encounter them
- Placing stations rightmost maximizes future benefit
- Can't do better by placing earlier (would help fewer future cities)

**Binary Search Validity:**
- Monotonic property: if target T achievable, all T' < T also achievable
- Can binary search for maximum feasible T

**Difference Array Efficiency:**
- Without: O(n) to update range for each station placement → O(n²) per check
- With: O(1) to update range → O(n) per check
- Critical optimization for large inputs

**Example Walkthrough (stations = [1,2,4,5,0], r = 1, k = 2):**

**Initial power calculation:**
- City 0: stations[0] + stations[1] = 1 + 2 = 3
- City 1: stations[0] + stations[1] + stations[2] = 1 + 2 + 4 = 7
- City 2: stations[1] + stations[2] + stations[3] = 2 + 4 + 5 = 11
- City 3: stations[2] + stations[3] + stations[4] = 4 + 5 + 0 = 9
- City 4: stations[3] + stations[4] = 5 + 0 = 5

**Binary search:**
- Try target = 5:
  - City 0: power = 3 < 5, need 2 stations
  - Place at position 0+1=1 (affects cities 0,1,2)
  - After: city 0 power = 5 ✓
  - Remaining cities already ≥ 5 ✓
  - Feasible with k=2 ✓

- Try target = 6:
  - Would need more stations → infeasible

**Result:** 5 ✓

**Key Insights:**

**Why Rightmost Placement:**
- Station at city i+r covers [i, i+2r]
- Helps current city i and future cities up to i+2r
- Leftmost placement at i-r would only help [i-2r, i]
- Future cities more valuable (haven't processed yet)

**Difference Array Update:**
- When adding at position p with range r:
- Affects [p-r, p+r]
- But we track from p onward (already processed earlier)
- So: `powerDiff[p+r+1] -= stationsNeeded`
- Removes contribution after coverage ends

**Edge Cases:**

**r = 0:**
- Each station only helps its own city
- Must place station in each city needing help
- Greedy still works

**k = 0:**
- No new stations
- Answer = minimum of initial powers

**All cities equal power:**
- Binary search converges quickly
- Answer = initial power (can't improve minimum)

**Large r (covers all cities):**
- Every station helps every city
- Optimal placement doesn't matter
- Can place all k anywhere

**Narrow range:**
- Greedy placement critical
- Wrong placement wastes coverage

# Complexity
- Time complexity: $$O(n \log(\text{sum} + k))$$ where n = cities, sum = total initial power - binary search O(log(sum+k)) iterations, each O(n) feasibility check
- Space complexity: $$O(n)$$ for difference array and temporary arrays

# Code
```typescript
const maxPower = (stations: number[], r: number, k: number): number => {
    const cityCount = stations.length;
    const powerDiff: number[] = new Array(cityCount + 1).fill(0);

    for (let cityIndex = 0; cityIndex < cityCount; cityIndex++) {
        const rangeStart = Math.max(0, cityIndex - r);
        const rangeEnd = Math.min(cityCount, cityIndex + r + 1);
        
        powerDiff[rangeStart] += stations[cityIndex];
        powerDiff[rangeEnd] -= stations[cityIndex];
    }

    const canAchieveMinPower = (targetMinPower: number): boolean => {
        const tempPowerDiff = [...powerDiff];
        let currentCityPower = 0;
        let remainingStations = k;

        for (let cityIndex = 0; cityIndex < cityCount; cityIndex++) {
            currentCityPower += tempPowerDiff[cityIndex];

            if (currentCityPower < targetMinPower) {
                const stationsNeeded = targetMinPower - currentCityPower;
                
                if (remainingStations < stationsNeeded) {
                    return false;
                }

                remainingStations -= stationsNeeded;
                
                const stationPosition = cityIndex + r;
                const coverageEnd = Math.min(cityCount, stationPosition + r + 1);
                
                tempPowerDiff[coverageEnd] -= stationsNeeded;
                currentCityPower += stationsNeeded;
            }
        }
        
        return true;
    };

    let minPossiblePower = Math.min(...stations);
    let maxPossiblePower = stations.reduce((sum, power) => sum + power, 0) + k;
    let maxAchievableMinPower = 0;

    while (minPossiblePower <= maxPossiblePower) {
        const midPower = Math.floor(minPossiblePower + (maxPossiblePower - minPossiblePower) / 2);
        
        if (canAchieveMinPower(midPower)) {
            maxAchievableMinPower = midPower;
            minPossiblePower = midPower + 1;
        } else {
            maxPossiblePower = midPower - 1;
        }
    }
    
    return maxAchievableMinPower;
};
```