# Net Position + Wildcard Boost | 7 Lines | O(n) | 1ms 

# Intuition
Fixed `L` and `R` moves determine the net displacement. Wildcards can all be assigned to whichever direction maximises the final distance — so they simply add to the absolute net position.

# Approach
- Track `position` (net displacement from fixed moves) and `wildcards` (count of `_`).
- After processing all moves, the maximum reachable distance is `|position| + wildcards` — assign all wildcards in the direction of the net movement.
- When `position = 0`, wildcards can all go the same direction — still `wildcards` away from origin.

# Complexity
- Time complexity: $$O(n)$$ — single pass through the string.

- Space complexity: $$O(1)$$ — two scalar variables.

# Code
```typescript []
const furthestDistanceFromOrigin = (moves: string): number => {
    let position = 0;
    let wildcards = 0;

    for (const move of moves) {
        if      (move === 'L') position--;
        else if (move === 'R') position++;
        else                   wildcards++;
    }

    return Math.abs(position) + wildcards;
};
```