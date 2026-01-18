# Linear Scan with Tie-Breaking | 13 Lines | O(n) | 28ms

# Intuition

Check each tower's Manhattan distance from center. Among reachable towers, track the one with maximum quality. Handle ties by choosing lexicographically smallest coordinates.

# Approach

**Single Pass Algorithm:**
1. Initialize best tower as [-1,-1] with quality -1
2. For each tower:
   - Calculate Manhattan distance from center
   - If within radius:
     - If higher quality: update best
     - If same quality: choose lexicographically smaller coordinates

**Lexicographic Comparison:**
- Compare x first: smaller x wins
- If x equal: compare y, smaller y wins

**Example: towers=[[1,2,5],[2,1,7],[3,1,9]], center=[1,1], radius=2**

Check each:
- [1,2,5]: dist=1, reachable, quality=5, best=[1,2]
- [2,1,7]: dist=1, reachable, quality=7>5, best=[2,1]
- [3,1,9]: dist=2, reachable, quality=9>7, best=[3,1]

Result: [3,1] ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through towers
  - Constant work per tower
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only tracking best tower
  - No additional data structures

# Code
```typescript []
const bestTower = (towers: number[][], center: number[], radius: number): number[] => {
    let best = [-1, -1];
    let maxQuality = -1;
    
    for (const [x, y, q] of towers) {
        const distance = Math.abs(x - center[0]) + Math.abs(y - center[1]);

        if (distance <= radius) {
            if (q > maxQuality || (q === maxQuality && (x < best[0] || (x === best[0] && y < best[1])))) {
                best = [x, y];
                maxQuality = q;
            }
        }
    }

    return best;
};
```