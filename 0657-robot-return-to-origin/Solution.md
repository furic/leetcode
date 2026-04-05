# XY Displacement Return Check | 9 Lines | O(n) | 1ms

# Intuition
The robot returns to the origin if and only if its net horizontal displacement and net vertical displacement are both zero — L/R must cancel out, and U/D must cancel out.

# Approach
- Track `x` and `y` coordinates starting at `(0, 0)`.
- For each move, increment or decrement the appropriate axis.
- Return `x === 0 && y === 0` after processing all moves.

# Complexity
- Time complexity: $$O(n)$$ — one pass through the moves string.

- Space complexity: $$O(1)$$ — two scalar variables.

# Code
```typescript []
const judgeCircle = (moves: string): boolean => {
    let x = 0, y = 0;

    for (const move of moves) {
        if      (move === 'R') x++;
        else if (move === 'L') x--;
        else if (move === 'U') y++;
        else if (move === 'D') y--;
    }

    return x === 0 && y === 0;
};
```