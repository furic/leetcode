# Dijkstra Min Heap Path | 57 Lines | O(n² log n²) | 54ms

# Intuition
We need to find the minimum water level required to reach the destination. The key insight is that we must wait for the water level to rise to at least the maximum elevation along any path. This is a shortest path problem where we want to minimize the maximum elevation encountered.

# Approach
**Modified Dijkstra's Algorithm:**
- Use a min heap to always explore the path with the lowest maximum water level first
- Track the maximum elevation encountered along each path as the "cost"
- The first time we reach the destination gives us the optimal answer

**Step-by-Step Process:**

1. **Initialize:**
   - Create a min heap prioritized by water level (maximum elevation seen so far on the path)
   - Start from (0,0) with initial water level equal to grid[0][0]
   - Use a visited set to avoid revisiting cells

2. **Exploration Loop:**
   - Dequeue the state with the lowest water level from the heap
   - If we've reached the destination (n-1, n-1), return the current water level
   - Otherwise, explore all 4 orthogonal neighbors

3. **Neighbor Processing:**
   - For each valid, unvisited neighbor:
     - Calculate required water level as max(current path's water level, neighbor's elevation)
     - This represents the minimum time needed to reach this neighbor via this path
     - Add the neighbor to the heap with this water level
     - Mark as visited to prevent reprocessing

4. **Why This Works:**
   - The heap ensures we always explore paths with lower maximum elevations first
   - When we reach destination, we've found the path that minimizes the maximum elevation
   - This corresponds to the minimum time we need to wait for water to rise

**Key Insight:**
- Unlike standard Dijkstra where we sum costs, here we take the maximum elevation
- The "cost" of a path is the highest elevation cell we must pass through
- This maps directly to the minimum time needed (water level must reach that height)

# Complexity
- Time complexity: $$O(n^2 \log n^2)$$ where n is grid size - each cell added to heap once, heap operations are O(log n²)
- Space complexity: $$O(n^2)$$ for visited set and heap

# Code
```typescript
type PathState = [waterLevel: number, row: number, col: number];

const swimInWater = (grid: number[][]): number => {
    const gridSize = grid.length;
    const directions: number[][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    const visitedCells = new Set<string>();
    const minHeap = new MinPriorityQueue<PathState>((state) => state[0]);
    
    const startRow = 0;
    const startCol = 0;
    const startWaterLevel = grid[startRow][startCol];
    
    minHeap.enqueue([startWaterLevel, startRow, startCol]);
    visitedCells.add(`${startRow},${startCol}`);
    
    const targetRow = gridSize - 1;
    const targetCol = gridSize - 1;

    while (!minHeap.isEmpty()) {
        const [currentWaterLevel, currentRow, currentCol] = minHeap.dequeue();

        if (currentRow === targetRow && currentCol === targetCol) {
            return currentWaterLevel;
        }

        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = currentRow + rowDelta;
            const neighborCol = currentCol + colDelta;
            const cellKey = `${neighborRow},${neighborCol}`;

            if (
                neighborRow < 0 || 
                neighborRow >= gridSize || 
                neighborCol < 0 || 
                neighborCol >= gridSize ||
                visitedCells.has(cellKey)
            ) {
                continue;
            }

            visitedCells.add(cellKey);
            
            const neighborElevation = grid[neighborRow][neighborCol];
            const requiredWaterLevel = Math.max(currentWaterLevel, neighborElevation);
            
            minHeap.enqueue([requiredWaterLevel, neighborRow, neighborCol]);
        }
    }

    return -1;
};
```