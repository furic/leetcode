# Grid State Simulation | 80 Lines | O(m × n + g × (m + n)) | 96ms

# Intuition
Guards can see in all four cardinal directions until blocked by walls or other guards. We need to simulate this line-of-sight for each guard and mark all cells they can see, then count remaining unguarded cells. Using a grid to track cell states and processing each guard's vision systematically gives us the answer.

# Approach
**Grid State Tracking with Vision Casting:**
- Initialize grid with guards and walls marked
- For each guard, cast vision rays in all four directions until hitting obstacles
- Mark cells as guarded during vision casting
- Track unguarded count by decrementing when marking cells

**Step-by-Step Process:**

1. **Define Cell States:**
   - EMPTY (0): Unoccupied and unguarded
   - GUARD (1): Guard position
   - WALL (2): Wall position
   - GUARDED (3): Empty cell visible to at least one guard

2. **Initialize Grid:**
   - Use `Uint8Array` for memory efficiency (4 states fit in 8 bits)
   - Flatten 2D grid to 1D: `index = row × cols + col`
   - Start with `unguardedCount = rows × cols - guards.length - walls.length`
   - Mark all guard and wall positions

3. **Process Each Guard's Vision:**
   - For each guard at (r, c), cast rays in 4 directions:
     - North: rows from r-1 down to 0
     - South: rows from r+1 up to rows-1
     - West: cols from c-1 down to 0
     - East: cols from c+1 up to cols-1

4. **Mark Cells as Guarded:**
   - For each cell in a ray's path:
     - If GUARD or WALL: stop ray (blocked)
     - If EMPTY: mark as GUARDED, decrement unguardedCount
     - If already GUARDED: continue (no change needed)

5. **Return Result:**
   - After processing all guards, unguardedCount holds the answer

**Why This Works:**

**Vision Casting Correctness:**
- Rays travel in straight lines from guards
- Stop at first obstacle (guard or wall)
- Multiple guards can see same cell (handled by state check)

**Optimization - Early Stopping:**
- Stop ray when hitting obstacle
- Don't need to process cells beyond obstacles
- Each ray processes O(max(m,n)) cells at most

**Memory Efficiency:**
- Uint8Array uses 1 byte per cell vs 8 bytes for numbers
- Significant savings for large grids
- 1D array has better cache locality than 2D

**Example Walkthrough (m=4, n=6, guards=[[0,0],[1,1],[2,3]], walls=[[0,1],[2,2],[1,4]]):**

**Initial Grid (G=guard, W=wall, .=empty):**
```
G W . . . .
. G . . W .
. . W G . .
. . . . . .
```

**Guard [0,0] vision:**
- North: none (edge)
- South: marks [1,0], [2,0], [3,0]
- West: none (edge)
- East: stops at wall [0,1]

**Guard [1,1] vision:**
- North: marks [0,1] (wait, that's a wall, stops)
- Actually, [0,1] is wall, so stops immediately
- South: marks [2,1], [3,1]
- West: marks [1,0] (already guarded)
- East: marks [1,2], [1,3], stops at wall [1,4]

**Guard [2,3] vision:**
- North: marks [1,3], [0,3]
- South: marks [3,3]
- West: stops at wall [2,2]
- East: marks [2,4], [2,5]

**Count unguarded cells:**
- Total cells: 4 × 6 = 24
- Guards: 3, Walls: 3
- Guarded: calculated during marking
- Unguarded: 7 ✓

**Key Insights:**

**Why Process All Guards:**
- Can't optimize by skipping guards
- Each guard has unique position and vision
- Multiple guards may collectively guard a cell

**State Transitions:**
- EMPTY → GUARDED (decrement count)
- GUARDED → GUARDED (no change)
- Never change GUARD or WALL states

**Direction Processing Order:**
- Doesn't matter which direction first
- All four must be processed
- Independent ray casts

**Edge Cases:**

**No guards:**
- All cells unguarded
- Return m × n - walls.length

**Guards everywhere:**
- All adjacent cells guarded
- May still have unguarded corners/pockets

**Guards and walls aligned:**
- Guard's vision completely blocked
- Those cells remain unguarded

**Guard next to wall:**
- Vision blocked in that direction immediately

**Guards see each other:**
- Vision stops at other guard
- Both guards' positions count as occupied

**Grid edges:**
- Rays naturally stop at boundaries
- No special handling needed

**Alternative Approaches:**

**BFS/DFS from each guard:**
- Similar complexity
- More overhead from queue/stack

**Mark entire grid first, then count:**
- Two passes vs our single pass with counting
- Slightly less efficient

**Bitwise flags:**
- Could use bits for directions
- Overkill for this problem

# Complexity
- Time complexity: $$O(m \times n + g \times (m + n))$$ where g = number of guards (grid initialization + each guard casts 4 rays of O(m+n) length)
- Space complexity: $$O(m \times n)$$ for the grid

# Code
```typescript
const countUnguarded = (
    rows: number,
    cols: number,
    guards: number[][],
    walls: number[][],
): number => {
    const EMPTY = 0;
    const GUARD = 1;
    const WALL = 2;
    const GUARDED = 3;

    const grid = new Uint8Array(rows * cols);
    let unguardedCount = rows * cols - guards.length - walls.length;

    const getIndex = (row: number, col: number): number => row * cols + col;

    for (const [row, col] of guards) {
        grid[getIndex(row, col)] = GUARD;
    }

    for (const [row, col] of walls) {
        grid[getIndex(row, col)] = WALL;
    }

    const processGuardVision = (guardRow: number, guardCol: number): void => {
        const markCellIfVisible = (row: number, col: number): boolean => {
            const cellIndex = getIndex(row, col);
            const cellState = grid[cellIndex];

            if (cellState === GUARD || cellState === WALL) {
                return true;
            }

            if (cellState === EMPTY) {
                grid[cellIndex] = GUARDED;
                unguardedCount--;
            }

            return false;
        };

        for (let row = guardRow - 1; row >= 0; row--) {
            if (markCellIfVisible(row, guardCol)) break;
        }

        for (let row = guardRow + 1; row < rows; row++) {
            if (markCellIfVisible(row, guardCol)) break;
        }

        for (let col = guardCol - 1; col >= 0; col--) {
            if (markCellIfVisible(guardRow, col)) break;
        }

        for (let col = guardCol + 1; col < cols; col++) {
            if (markCellIfVisible(guardRow, col)) break;
        }
    };

    for (const [guardRow, guardCol] of guards) {
        processGuardVision(guardRow, guardCol);
    }

    return unguardedCount;
};
```