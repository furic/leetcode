# Sliding Window Direction Tracking | 32 Lines | O(n) | 237ms

# Intuition
When we remove a contiguous substring of length k, we're left with the remaining moves that determine our final position. The key insight is that the final coordinate depends only on the net movement in each direction after removal. Instead of simulating each possible removal, we can use a sliding window to efficiently track the direction counts for all possible k-length substrings and compute the resulting endpoints.

# Approach
I'll use a sliding window with direction counting:

1. **Direction Frequency Tracking**: Maintain a count of each direction (U, D, L, R) within the current sliding window of size k.

2. **Sliding Window**: Move a window of size k across the string, updating direction counts as directions enter and exit the window.

3. **Net Movement Calculation**: For each window position, calculate the net movement after removing that substring:
   - Net vertical: max(0, U_count - D_count) for up, max(0, D_count - U_count) for down
   - Net horizontal: max(0, L_count - R_count) for left, max(0, R_count - L_count) for right

4. **Endpoint Representation**: Represent each final coordinate as a unique string key combining the four directional movements.

5. **Distinct Count**: Use a Set to automatically handle deduplication of identical endpoints.

The algorithm efficiently considers all possible substring removals without explicitly simulating each path.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string with sliding window: O(n)
  - Each window operation (add/remove direction, calculate endpoint) takes O(1)
  - Set operations for tracking unique endpoints: O(1) average case

- Space complexity: $$O(n)$$
  - Direction count map uses O(1) space (4 directions)
  - Set storing unique endpoints uses O(n) space in worst case
  - All other variables use constant space

# Code
```typescript []
const distinctPoints = (s: string, k: number): number => {
    const totalMoves = s.length;
    
    const directionCounts = new Map<string, number>([
        ['U', 0],
        ['D', 0], 
        ['L', 0],
        ['R', 0]
    ]);
    
    const uniqueEndpoints = new Set<string>();

    for (let windowEnd = 0; windowEnd < totalMoves; windowEnd++) {
        if (windowEnd >= k) {
            const exitingDirection = s[windowEnd - k];
            directionCounts.set(exitingDirection, directionCounts.get(exitingDirection)! - 1);
        }
        
        const enteringDirection = s[windowEnd];
        directionCounts.set(enteringDirection, directionCounts.get(enteringDirection)! + 1);
        
        if (windowEnd >= k - 1) {
            const upMovement = Math.max(0, directionCounts.get('U')! - directionCounts.get('D')!);
            const downMovement = Math.max(0, directionCounts.get('D')! - directionCounts.get('U')!);
            const leftMovement = Math.max(0, directionCounts.get('L')! - directionCounts.get('R')!);
            const rightMovement = Math.max(0, directionCounts.get('R')! - directionCounts.get('L')!);
            
            const endpointKey = `${upMovement}|${downMovement}|${leftMovement}|${rightMovement}`;
            uniqueEndpoints.add(endpointKey);
        }
    }
    
    return uniqueEndpoints.size;
};
```