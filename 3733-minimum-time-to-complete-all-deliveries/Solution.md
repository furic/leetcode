# Binary Search with LCM Overlap | 50 Lines | O(log T × log(max(r))) | 6ms

# Intuition
We need to find the minimum time where both drones can complete their required deliveries considering recharge intervals. This is a classic binary search on answer problem - we can check if a given time T is sufficient, so we binary search for the minimum such T.

# Approach
**Binary Search with Feasibility Check:**
- Binary search on time from 0 to reasonable upper bound
- For each candidate time, calculate available delivery slots considering:
  - Individual drone recharge schedules
  - Overlapping recharge times (using LCM)
- Check if total delivery capacity meets requirements

**Step-by-Step Process:**

1. **Setup Binary Search Bounds:**
   - `minTime = 0` (minimum possible)
   - `maxTime = 10^18` (upper bound)
   - Optimize: estimate based on deliveries and recharge intervals

2. **Calculate GCD Helper:**
   - Euclidean algorithm: `gcd(a, b) = gcd(b, a % b)`
   - Needed for LCM calculation
   - Base case: `gcd(a, 0) = a`

3. **Binary Search Loop:**
   - While `minTime ≤ maxTime`:
   - Calculate midpoint: `candidateTime = ⌊(min + max) / 2⌋`
   - Check feasibility of this time

4. **Feasibility Check for Time T:**

   **Calculate individual capacity:**
   - Drone 1 slots: `T - ⌊T / r1⌋`
     - Total hours T minus recharge hours
   - Drone 2 slots: `T - ⌊T / r2⌋`

   **Calculate overlapping recharges:**
   - LCM = (r1 × r2) / gcd(r1, r2)
   - Overlapping hours: `⌊T / lcm⌋`
   - These are counted twice in individual calculations

   **Calculate true total capacity:**
   - Individual recharges: `⌊T/r1⌋ + ⌊T/r2⌋`
   - Subtract overlaps: `- ⌊T/lcm⌋`
   - Total slots: `T - totalRechargeHours`

   **Feasibility conditions (ALL must hold):**
   1. `drone1Slots ≥ d1` (drone 1 has enough individual capacity)
   2. `drone2Slots ≥ d2` (drone 2 has enough individual capacity)
   3. `drone1Slots + drone2Slots - totalSlots ≥ d1 + d2` (combined capacity sufficient)

5. **Update Search Space:**
   - If feasible: try smaller time (`maxTime = candidateTime - 1`)
   - If not feasible: need more time (`minTime = candidateTime + 1`)

6. **Return Result:**
   - When loop exits, `minTime` is the minimum sufficient time

**Why This Works:**

**Binary Search Validity:**
- Monotonic property: if time T works, all T' > T also work
- Can binary search for minimum working T
- Convergence guaranteed

**LCM for Overlap:**
- Drones recharge simultaneously at multiples of lcm(r1, r2)
- At these hours, both drones are unavailable
- Must subtract these from individual counts to avoid double-counting

**Three Conditions:**
- Individual capacity: each drone must complete its own deliveries
- Combined capacity: total work must fit in available slots
- Both necessary: individual ensures distribution is possible

**Example Walkthrough (d = [3,1], r = [2,3]):**

**Binary search iterations (simplified):**

**Try T = 5:**
- Drone 1 slots: 5 - ⌊5/2⌋ = 5 - 2 = 3 ≥ 3 ✓
- Drone 2 slots: 5 - ⌊5/3⌋ = 5 - 1 = 4 ≥ 1 ✓
- gcd(2,3) = 1, lcm = 6
- Overlap hours: ⌊5/6⌋ = 0
- Total recharge: 2 + 1 - 0 = 3
- Total slots: 5 - 3 = 2
- Combined check: 3 + 4 - 2 = 5 ≥ 4 ✓
- Feasible! Try smaller...

**Try T = 4:**
- Drone 1 slots: 4 - 2 = 2 < 3 ✗
- Not feasible

**Result:** 5 ✓

**Example 2 (d = [1,3], r = [2,2]):**

**Try T = 7:**
- Drone 1 slots: 7 - ⌊7/2⌋ = 7 - 3 = 4 ≥ 1 ✓
- Drone 2 slots: 7 - ⌊7/2⌋ = 7 - 3 = 4 ≥ 3 ✓
- gcd(2,2) = 2, lcm = 2
- Overlap hours: ⌊7/2⌋ = 3
- Total recharge: 3 + 3 - 3 = 3
- Total slots: 7 - 3 = 4
- Combined: 4 + 4 - 4 = 4 ≥ 4 ✓

**Result:** 7 ✓

**Key Insights:**

**Why LCM Matters:**
- Without LCM correction, overcount available slots
- Example: r1=r2=2, both recharge at 2,4,6...
- Would count each hour twice without LCM subtraction

**Three Feasibility Checks:**
- Just checking total slots insufficient
- Must ensure each drone individually capable
- AND combined capacity exists

**Upper Bound Optimization:**
- Naive: 10^18
- Better: estimate based on max deliveries × max recharge
- Speeds up binary search

**Edge Cases:**

**Same recharge intervals:**
- r1 = r2: LCM = r1, always overlap
- Must be careful with capacity calculation

**One drone no recharges needed:**
- If d1 or d2 = 0: trivial subproblem
- Other drone determines time

**Large recharge intervals:**
- Few or no recharges in reasonable time
- Nearly all hours available

**Small recharge intervals:**
- Frequent recharges
- Significant overlap possible

**Prime recharge intervals:**
- gcd = 1, lcm = r1 × r2
- Minimal overlap (only at lcm)

# Complexity
- Time complexity: $$O(\log T \times \log(\max(r)))$$ where T is the answer value - binary search O(log T) iterations, each doing O(log r) GCD calculation
- Space complexity: $$O(1)$$ - only using variables

# Code
```typescript
const minimumTime = (deliveries: number[], rechargeIntervals: number[]): number => {
    const calculateGCD = (a: number, b: number): number => {
        return b === 0 ? a : calculateGCD(b, a % b);
    };

    let minTime = 0;
    let maxTime = 1e18;
    
    const estimatedMax = (deliveries[0] + deliveries[1]) * Math.max(rechargeIntervals[0], rechargeIntervals[1]);
    maxTime = Math.min(maxTime, Math.max(100, estimatedMax));

    while (minTime <= maxTime) {
        const candidateTime = Math.floor((minTime + maxTime) / 2);
        
        const drone1Slots = candidateTime - Math.floor(candidateTime / rechargeIntervals[0]);
        const drone2Slots = candidateTime - Math.floor(candidateTime / rechargeIntervals[1]);
        
        const gcd = calculateGCD(rechargeIntervals[0], rechargeIntervals[1]);
        const lcm = (rechargeIntervals[0] / gcd) * rechargeIntervals[1];
        
        const totalRechargeHours = Math.floor(candidateTime / rechargeIntervals[0]) + 
                                    Math.floor(candidateTime / rechargeIntervals[1]) - 
                                    Math.floor(candidateTime / lcm);
        const totalSlots = candidateTime - totalRechargeHours;
        
        if (drone1Slots >= deliveries[0] && 
            drone2Slots >= deliveries[1] && 
            drone1Slots + drone2Slots - totalSlots >= deliveries[0] + deliveries[1]) {
            maxTime = candidateTime - 1;
        } else {
            minTime = candidateTime + 1;
        }
    }

    return minTime;
};
```