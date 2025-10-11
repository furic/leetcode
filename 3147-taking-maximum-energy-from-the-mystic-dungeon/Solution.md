# Backward Chain Traversal | 16 Lines | O(n) | 68ms

# Intuition
We need to find the maximum energy by choosing a starting magician and jumping by k positions until we reach the end. The key insight is that we can "stop" at any magician along the path - we don't have to complete the entire chain. This means we should track the maximum cumulative sum at any point during each possible path.

# Approach
**Backward Traversal Strategy:**
- Only the last k positions can serve as meaningful starting points (any earlier position would be visited by jumping from a later position)
- For each of these k possible chains, walk backwards accumulating energy
- Track the maximum energy achievable at any point in each chain

**Step-by-Step Process:**

1. **Identify Valid Starting Positions:**
   - Only positions from `(n - k)` to `(n - 1)` need to be considered as starts
   - Starting earlier would create a chain that overlaps with one of these k chains
   - Each of these k positions represents a distinct "chain" of magicians reachable by k-jumps

2. **Process Each Chain:**
   - For each starting position in the last k positions:
     - Initialize `currentPathEnergy = 0`
     - Walk backwards by k steps: `position -= k`
     - At each step, add that magician's energy to the path total

3. **Track Maximum at Every Step:**
   - **Critical insight:** We can choose to "stop" at any magician along the path
   - This means the answer isn't just the final sum - it's the maximum sum at any point
   - Update `maxEnergyGained` with `currentPathEnergy` after each magician
   - This allows us to capture the optimal stopping point if negative energies appear later

4. **Why Backward Traversal:**
   - Walking backward from end positions naturally visits all magicians in each k-spaced chain
   - Allows us to accumulate sums and track maximums in a single pass per chain
   - Avoids complex forward simulation with early stopping logic

**Example Walkthrough (energy = [5,2,-10,-5,1], k = 3):**
- Chain starting at index 4: 1 (max = 1)
- Chain starting at index 3: -5 → -5 + 5 = 0 (max = 0)  
- Chain starting at index 2: -10 → -10 + 2 = -8 (max = -8)
- But wait! Starting at index 1 and stopping immediately: 2 + 1 = 3 (this is chain from index 4, capturing intermediate maximum)

# Complexity
- Time complexity: $$O(n)$$ - we visit each magician at most once across all chains
- Space complexity: $$O(1)$$ - only using variables for tracking

# Code
```typescript
const maximumEnergy = (energy: number[], k: number): number => {
    const totalMagicians = energy.length;
    let maxEnergyGained = -Infinity;

    for (let startPosition = totalMagicians - k; startPosition < totalMagicians; startPosition++) {
        let currentPathEnergy = 0;

        for (let position = startPosition; position >= 0; position -= k) {
            currentPathEnergy += energy[position];
            
            maxEnergyGained = Math.max(maxEnergyGained, currentPathEnergy);
        }
    }

    return maxEnergyGained;
};
```