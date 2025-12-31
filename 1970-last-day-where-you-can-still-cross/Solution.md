# Union-Find Backwards Simulation | 64 Lines | O(n × α(n)) | 66ms

# Intuition

Instead of simulating forward (adding water until path is blocked), we work backwards: start with all cells flooded, then add land back day by day until top and bottom rows become connected. Union-Find efficiently tracks connectivity using virtual nodes to represent "any cell in top row" and "any cell in bottom row."

# Approach

**Key Insight - Reverse Time:**
- Forward simulation: Hard to detect exactly when path gets blocked
- Backward simulation: Easy to detect when path first forms (top connects to bottom)
- Process cells array in reverse: the day when top/bottom connect is our answer

**Virtual Nodes Technique:**
- `virtualTopNode`: Connected to all top-row land cells
- `virtualBottomNode`: Connected to all bottom-row land cells  
- When these two become connected → a path exists from top to bottom

**Algorithm Steps:**
1. Initialize Union-Find structure with space for all cells + 2 virtual nodes
2. Process `cells` array backwards (from last day to day 0)
3. For each day going backwards:
   - Convert that cell from water to land
   - Union with all adjacent land cells (4 directions)
   - If in top row: union with `virtualTopNode`
   - If in bottom row: union with `virtualBottomNode`
   - Check if `virtualTopNode` and `virtualBottomNode` are connected
   - If connected: this is the last day you can walk (return day index)

**Example (row=2, col=2, cells=[[1,1],[2,1],[1,2],[2,2]]):**

Working backwards:
- Day 3: Add (2,2) land → only bottom-right exists
- Day 2: Add (1,2) land → top-right, connects to virtualTop
- Day 1: Add (2,1) land → bottom-left, connects to virtualBottom
- Day 0: Add (1,1) land → top-left, connects neighbors
  - (1,1) connects to (1,2) which links to virtualTop
  - (1,1) connects to (2,1) which links to virtualBottom
  - virtualTop and virtualBottom now connected!
  - Return day 2 (last day with valid path)

Result: 2 ✓

# Complexity

- Time complexity: $$O(n \times \alpha(n))$$
  - n = row × col = total cells
  - Process each cell once: O(n)
  - Per cell: 4 union operations + 1 find check
  - Union/Find with path compression: O(α(n)) amortized
  - α(n) is inverse Ackermann (practically constant)
  - Overall: O(n × α(n)) ≈ O(n)

- Space complexity: $$O(n)$$
  - Union-Find arrays (parent, rank): O(n + 2)
  - isLand grid: O(row × col) = O(n)
  - Overall: O(n)

# Code
```typescript []
const latestDayToCross = (row: number, col: number, cells: number[][]): number => {
    const totalCells = row * col;
    const virtualTopNode = totalCells;
    const virtualBottomNode = totalCells + 1;

    const parent: number[] = Array.from({ length: totalCells + 2 }, (_, i) => i);
    const rank: number[] = Array(totalCells + 2).fill(0);
    const isLand: boolean[][] = Array.from({ length: row }, () => Array(col).fill(false));

    const find = (x: number): number => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };

    const union = (a: number, b: number): void => {
        const rootA = find(a);
        const rootB = find(b);
        
        if (rootA === rootB) return;
        
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else {
            parent[rootB] = rootA;
            if (rank[rootA] === rank[rootB]) {
                rank[rootA]++;
            }
        }
    };

    const rowDirections = [1, -1, 0, 0];
    const colDirections = [0, 0, 1, -1];

    for (let dayIndex = totalCells - 1; dayIndex >= 0; dayIndex--) {
        const currentRow = cells[dayIndex][0] - 1;
        const currentCol = cells[dayIndex][1] - 1;
        
        isLand[currentRow][currentCol] = true;
        const cellIndex = currentRow * col + currentCol;

        if (currentRow === 0) {
            union(cellIndex, virtualTopNode);
        }
        
        if (currentRow === row - 1) {
            union(cellIndex, virtualBottomNode);
        }

        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            const neighborRow = currentRow + rowDirections[directionIndex];
            const neighborCol = currentCol + colDirections[directionIndex];
            
            if (
                neighborRow >= 0 && neighborRow < row &&
                neighborCol >= 0 && neighborCol < col &&
                isLand[neighborRow][neighborCol]
            ) {
                const neighborIndex = neighborRow * col + neighborCol;
                union(cellIndex, neighborIndex);
            }
        }

        if (find(virtualTopNode) === find(virtualBottomNode)) {
            return dayIndex;
        }
    }
    
    return 0;
};
```