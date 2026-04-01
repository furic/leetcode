# Monotonic Stack Collision Simulation | 28 Lines | O(n log n) | 64ms

# Intuition
Only right-moving robots can collide with left-moving robots — and only when a left-mover is to the right of a right-mover. Processing robots in positional order and using a stack of pending right-movers lets us simulate collisions greedily: each left-mover fights the rightmost right-mover until it dies, survives, or runs out of opponents.

# Approach
- Sort robot indices by `positions` to process collisions in spatial order.
- Maintain `rightStack` — a stack of indices of right-moving robots still alive, ordered by position (leftmost at bottom).
- For each robot (in sorted position order):
  - **Right-moving:** push onto `rightStack` — may collide with future left-movers.
  - **Left-moving:** fight the top of `rightStack` repeatedly:
    - If the right-mover has less health: it dies (`survived[opponent] = false`, pop), the left-mover loses 1 health and continues fighting.
    - If the right-mover has more health: the left-mover dies (`survived[idx] = false`), the right-mover loses 1 health and stays. Break.
    - If equal health: both die, pop and break.
    - If stack empties, the left-mover survives unopposed.
- After processing, collect `healths[i]` for all `i` where `survived[i]` is true, in original input order.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort; each robot is pushed and popped from the stack at most once, giving $$O(n)$$ for collision simulation.

- Space complexity: $$O(n)$$ — the stack, survived array, and sorted indices.

# Code
```typescript []
const survivedRobotsHealths = (
    positions: number[],
    healths: number[],
    directions: string
): number[] => {
    const n = positions.length;

    const sortedIndices = Array.from({ length: n }, (_, i) => i)
        .sort((a, b) => positions[a] - positions[b]);

    const survived = new Array(n).fill(true);
    const rightStack: number[] = [];

    for (const idx of sortedIndices) {
        if (directions[idx] === 'R') {
            rightStack.push(idx);
        } else {
            while (rightStack.length) {
                const opponent = rightStack[rightStack.length - 1];

                if (healths[opponent] < healths[idx]) {
                    survived[opponent] = false;
                    rightStack.pop();
                    healths[idx]--;
                } else if (healths[opponent] > healths[idx]) {
                    survived[idx] = false;
                    healths[opponent]--;
                    break;
                } else {
                    survived[opponent] = false;
                    survived[idx] = false;
                    rightStack.pop();
                    break;
                }
            }
        }
    }

    const result: number[] = [];
    for (let i = 0; i < n; i++)
        if (survived[i]) result.push(healths[i]);

    return result;
};
```