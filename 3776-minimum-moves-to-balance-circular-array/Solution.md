# Greedy Circular Distance | 40 Lines | O(n log n) | 38ms

# Intuition
Since at most one person has negative balance and we can only transfer one unit at a time between neighbors, the optimal strategy is to transfer balance from the closest positive sources to fill the deficit. In a circular array, we can transfer in either direction, so we should choose the shorter circular path.

# Approach
- **Feasibility Check**:
  - Calculate total sum of all balances
  - If sum < 0, it's impossible to make everyone non-negative (not enough total balance)
  - Return -1 immediately in this case

- **Identify the Problem**:
  - Find the single index with negative balance (guaranteed at most one)
  - If no negative balance exists, no moves needed, return 0
  - Calculate the deficit: how much is needed to bring this person to zero

- **Circular Distance Calculation**:
  - In a circular array of length n, distance between indices i and j has two paths
  - Clockwise distance: depends on whether we go right or wrap around
  - Counter-clockwise distance: the complement path
  - Circular distance = min(|i - j|, n - |i - j|)
  - This gives us the shortest path between any two positions

- **Source Collection**:
  - Identify all positions with positive balance (potential sources)
  - For each source, calculate its circular distance to the deficit position
  - Store both the available balance and distance for each source

- **Greedy Selection Strategy**:
  - Sort sources by distance in ascending order
  - Transfer from closest sources first to minimize total moves
  - Each unit transferred travels the circular distance, contributing that many moves

- **Move Calculation**:
  - For each source (in distance order):
    - Determine how much to take: min(available at source, remaining deficit)
    - Add (amount taken × distance) to total moves
    - Reduce remaining deficit by amount taken
    - Stop when deficit is filled

- **Why Greedy Works**:
  - Each unit must travel from a source to the deficit
  - Total moves = sum of (units × distance) for all transfers
  - To minimize this sum, we should use closest sources first
  - This is optimal because using a farther source when a closer one is available would only increase total moves

- **Example Walkthrough** ([5,1,-4]):
  - Sum = 2 ≥ 0, feasible ✓
  - Deficit at index 2, need 4 units
  - Sources: index 0 (5 available, distance min(2, 1) = 1), index 1 (1 available, distance 1)
  - Both equidistant, take 1 from index 1: 1 × 1 = 1 move
  - Take 3 from index 0: 3 × 1 = 3 moves
  - Total: 4 moves ✓

# Complexity
- Time complexity: $$O(n \log n)$$
  - Calculate sum: O(n)
  - Find negative index: O(n)
  - Build sources array: O(n)
  - Sort sources by distance: O(n log n)
  - Process sources: O(n)
  - Dominated by sorting: O(n log n)

- Space complexity: $$O(n)$$
  - Sources array stores at most n-1 entries: O(n)
  - All other variables: O(1)
  - Total: O(n)

# Code
```typescript
const minMoves = (balance: number[]): number => {
    const n = balance.length;
    const sum = balance.reduce((a, b) => a + b, 0);
    
    if (sum < 0) return -1;
    
    let negIndex = -1;
    for (let i = 0; i < n; i++) {
        if (balance[i] < 0) {
            negIndex = i;
            break;
        }
    }
    
    if (negIndex === -1) return 0;
    
    const needed = -balance[negIndex];
    
    const sources = [];
    for (let i = 0; i < n; i++) {
        if (i !== negIndex && balance[i] > 0) {
            const dist = Math.min(
                Math.abs(i - negIndex),
                n - Math.abs(i - negIndex)
            );
            sources.push({ available: balance[i], distance: dist });
        }
    }
    
    sources.sort((a, b) => a.distance - b.distance);
    
    let moves = 0;
    let remaining = needed;
    
    for (const source of sources) {
        const take = Math.min(source.available, remaining);
        moves += take * source.distance;
        remaining -= take;
        if (remaining === 0) break;
    }
    
    return moves;
};
```