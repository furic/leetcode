# Binary Search with Greedy | 18 Lines | O(m log(S/n)) | 34ms

# Intuition
Since we can swap batteries freely, the question becomes: can all n computers run for T minutes? For a given T, each battery contributes at most min(capacity, T) useful minutes (excess capacity beyond T is wasted on one computer). Binary search finds the maximum feasible T.

# Approach
- **Problem Insight - Free Swapping**:
  - Batteries can be swapped instantly between computers
  - This means total usable power can be distributed optimally
  - No single battery needs to power one computer the entire time

- **Binary Search Framework**:
  - Search space: 1 to totalPower/n (upper bound if power evenly distributed)
  - For each candidate runtime T, check if it's achievable
  - Monotonic property: if T is achievable, all T' < T are also achievable

- **Feasibility Check - Greedy Insight**:
  - To run n computers for T minutes, need n × T total minutes
  - Each battery contributes min(capacity, T) usable minutes
  - Why cap at T? A single battery can only power one computer at a time
  - Battery with capacity > T can contribute at most T minutes (excess unused)

- **Why Capping Works**:
  - If battery has 100 minutes and T = 50, it can only give 50 to one computer
  - Cannot "split" a battery across two computers simultaneously
  - But batteries with capacity < T can be combined through swapping

- **Feasibility Formula**:
  - Sum of min(battery[i], T) for all batteries
  - If sum ≥ n × T, then T minutes is achievable
  - Batteries smaller than T can fill gaps left by swapping

- **Binary Search Logic**:
  - If canRun(mid) is true: try larger runtime (left = mid + 1)
  - If canRun(mid) is false: reduce target (right = mid - 1)
  - Return right (last feasible value)

- **Example Walkthrough** (n=2, batteries=[3,3,3]):
  - Total = 9, upper bound = 9/2 = 4
  - Check T=2: need 4 min, have min(3,2)+min(3,2)+min(3,2)=6 ✓
  - Check T=3: need 6 min, have 3+3+3=9 ✓
  - Check T=4: need 8 min, have min(3,4)+min(3,4)+min(3,4)=9 ✓
  - Check T=5: need 10 min, have 3+3+3=9 ✗
  - Result: 4

- **Edge Cases Handled**:
  - Single computer: max runtime = total battery power
  - Many small batteries: can combine through swapping
  - One huge battery: capped by target runtime

# Complexity
- Time complexity: $$O(m \cdot \log(S/n))$$
  - Binary search range: 1 to S/n where S = total battery power
  - Number of iterations: O(log(S/n))
  - Each feasibility check: O(m) where m = number of batteries
  - Total: O(m × log(S/n))

- Space complexity: $$O(1)$$
  - Only constant extra variables used
  - No additional data structures
  - Input array not modified

# Code
```typescript
const maxRunTime = (n: number, batteries: number[]): number => {
    const totalBatteryPower = batteries.reduce((sum, battery) => sum + battery, 0);

    const canRunAllComputers = (targetRuntime: number): boolean => {
        const totalMinutesNeeded = n * targetRuntime;
        let usableMinutes = 0;

        for (const batteryCapacity of batteries) {
            usableMinutes += Math.min(batteryCapacity, targetRuntime);
            if (usableMinutes >= totalMinutesNeeded) return true;
        }

        return false;
    };

    let left = 1;
    let right = Math.floor(totalBatteryPower / n);

    while (left <= right) {
        const midRuntime = Math.floor((left + right) / 2);

        if (canRunAllComputers(midRuntime)) {
            left = midRuntime + 1;
        } else {
            right = midRuntime - 1;
        }
    }

    return right;
};
```