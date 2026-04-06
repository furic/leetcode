# Direction Array Obstacle Hash Simulation | 18 Lines | O(n + k) | 16ms

# Intuition
Simulate the robot step by step. The only non-trivial part is checking obstacles efficiently — a hash set with a compact coordinate encoding gives O(1) lookup per step.

# Approach
- **Direction encoding:** Use a 4-element cycle `[West, South, East, North]` indexed 0–3. Turning right decrements the index (`dir - 1 + 4) % 4`), turning left increments it (`dir + 1) % 4`). Direction vectors `dx`/`dy` indexed by direction give the unit step.
- **Obstacle encoding:** Pack `(x, y)` into a single integer via `(x << 16) + y` for O(1) set lookup. Valid given the coordinate bounds (`±3×10⁴` fits in 16 bits with a shift).
- **Simulation:** For each command:
  - `-1` / `-2`: rotate direction.
  - `1–9`: step one unit at a time up to `k` times, stopping immediately if the next cell is an obstacle.
  - After each move command, update `maxDistSq = max(maxDistSq, x² + y²)` — we track at every step end, not mid-step, since each step updates position before the check.
- Return `maxDistSq`.

# Complexity
- Time complexity: $$O(n + k)$$ where $$n$$ = number of obstacles (for set construction) and $$k$$ = total steps across all move commands (at most `9 × commands.length`).

- Space complexity: $$O(n)$$ — the obstacle hash set.

# Code
```typescript []
const Direction = { West: 0, South: 1, East: 2, North: 3 } as const;

const dx = [-1, 0, 1, 0];
const dy = [ 0,-1, 0, 1];

const robotSim = (commands: number[], obstacles: number[][]): number => {
    const obstacleSet = new Set(obstacles.map(([x, y]) => (x << 16) + y));
    const isObstacle = (x: number, y: number) => obstacleSet.has((x << 16) + y);

    let x = 0, y = 0, dir = Direction.North;
    let maxDistSq = 0;

    for (const command of commands) {
        if (command === -1) {
            dir = (dir - 1 + 4) % 4;
        } else if (command === -2) {
            dir = (dir + 1) % 4;
        } else {
            for (let step = 0; step < command; step++) {
                const nx = x + dx[dir];
                const ny = y + dy[dir];
                if (isObstacle(nx, ny)) break;
                x = nx;
                y = ny;
            }
            maxDistSq = Math.max(maxDistSq, x * x + y * y);
        }
    }

    return maxDistSq;
};
```