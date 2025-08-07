# Dynamic Programming Paths | 52 Lines | O(n²) | 21ms

# Intuition
The problem involves three children moving from different corners to the bottom-right corner (n-1, n-1). Since all children end at the same position, we can treat this as three separate path optimization problems. The key insight is that we can solve each child's path independently using dynamic programming, where each child collects fruits optimally along their allowed movement patterns.

# Approach
I'll use dynamic programming to find the optimal path for each child:

1. **Child 1 (Diagonal)**: Moves from (0,0) to (n-1,n-1) only along the main diagonal, so we simply sum all diagonal elements.

2. **Child 3 (Bottom-left triangle)**: Moves from (n-1,0) to (n-1,n-2) with moves: up-right, right, down-right. We use DP where each cell accumulates the maximum fruits from valid previous positions.

3. **Child 2 (Top-right triangle)**: Moves from (0,n-1) to (n-2,n-1) with moves: down-left, down, down-right. Similar DP approach but processing from top to bottom.

The algorithm processes each region separately, updating each cell with the maximum fruits achievable from valid predecessor cells. This ensures we find the optimal path for each child without interference.

# Complexity
- Time complexity: $$O(n^2)$$
  - We process each cell in the grid once for each relevant child's movement pattern
  - The diagonal takes O(n), and each triangle region takes O(n²) in the worst case

- Space complexity: $$O(1)$$
  - We modify the input grid in-place to store DP values
  - No additional data structures are needed beyond a few variables

# Code
```typescript []
const maxCollectedFruits = (fruits: number[][]): number => {
    const gridSize = fruits.length;
    const midPoint = Math.ceil((gridSize - 1) / 2);
    let totalFruitsCollected = 0;

    for (let i = 0; i < gridSize; i++) {
        totalFruitsCollected += fruits[i][i];
    }

    const updateFromLeftNeighbors = (row: number, column: number) => {
        let maxFromLeft = 0;
        if (row - 1 >= gridSize - column) {
            maxFromLeft = fruits[row - 1][column - 1];
        }
        if (row >= gridSize - column) {
            maxFromLeft = Math.max(maxFromLeft, fruits[row][column - 1]);
        }
        if (row + 1 >= gridSize - column && row + 1 < gridSize) {
            maxFromLeft = Math.max(maxFromLeft, fruits[row + 1][column - 1]);
        }
        fruits[row][column] += maxFromLeft;
    };

    for (let column = 1; column <= midPoint - 1; column++) {
        for (let row = gridSize - 1; row >= gridSize - column - 1; row--) {
            updateFromLeftNeighbors(row, column);
        }
    }
    for (let column = midPoint; column <= gridSize - 2; column++) {
        for (let row = gridSize - 1; row >= column + 1; row--) {
            updateFromLeftNeighbors(row, column);
        }
    }
    totalFruitsCollected += fruits[gridSize - 1][gridSize - 2];

    const updateFromTopNeighbors = (row: number, column: number) => {
        let maxFromTop = 0;
        if (column - 1 >= gridSize - row) {
            maxFromTop = fruits[row - 1][column - 1];
        }
        if (column >= gridSize - row) {
            maxFromTop = Math.max(maxFromTop, fruits[row - 1][column]);
        }
        if (column + 1 >= gridSize - row && column + 1 < gridSize) {
            maxFromTop = Math.max(maxFromTop, fruits[row - 1][column + 1]);
        }
        fruits[row][column] += maxFromTop;
    };

    for (let row = 1; row <= midPoint - 1; row++) {
        for (let column = gridSize - 1; column >= gridSize - row - 1; column--) {
            updateFromTopNeighbors(row, column);
        }
    }
    for (let row = midPoint; row <= gridSize - 2; row++) {
        for (let column = gridSize - 1; column >= row + 1; column--) {
            updateFromTopNeighbors(row, column);
        }
    }
    totalFruitsCollected += fruits[gridSize - 2][gridSize - 1];

    return totalFruitsCollected;
};
```