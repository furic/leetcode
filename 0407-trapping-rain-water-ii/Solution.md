# Min Heap Border Inward | 78 Lines | O(mn log(mn)) |

# Intuition
Water can only be trapped if it's surrounded by higher walls. The key insight is that water will flow out from the lowest point on the boundary. We need to process cells from the outside in, starting with the lowest boundary cells, to determine how much water can be trapped at each position.

# Approach
Start by adding all boundary cells to a min heap since water cannot be trapped at the edges. Process cells in order of increasing height using the heap. For each cell, examine its unvisited neighbors. If a neighbor is lower than the current water level, water can be trapped there - the amount is the difference between the current water level and the neighbor's height. Add each neighbor to the heap with a height equal to the maximum of its actual height and the current water level (this represents the water level that will be maintained). Mark cells as visited to avoid reprocessing. Continue until all cells are processed.

# Complexity
- Time complexity: $$O(mn \log(mn))$$ where m and n are grid dimensions, due to heap operations
- Space complexity: $$O(mn)$$ for the visited array and heap

# Code
```typescript
type Cell = {
    row: number;
    col: number;
    height: number;
}

const trapRainWater = (heightMap: number[][]): number => {
    const rows = heightMap.length;
    const cols = heightMap[0].length;

    if (rows < 3 || cols < 3) return 0;

    const isVisited: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );

    const minHeap = new MinPriorityQueue<Cell>((cell) => cell.height);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isBorderCell = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
            
            if (isBorderCell) {
                minHeap.enqueue({ row, col, height: heightMap[row][col] });
                isVisited[row][col] = true;
            }
        }
    }

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    let totalWaterTrapped = 0;

    while (!minHeap.isEmpty()) {
        const currentCell = minHeap.dequeue();

        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = currentCell.row + rowDelta;
            const neighborCol = currentCell.col + colDelta;

            if (
                neighborRow < 0 || 
                neighborRow >= rows || 
                neighborCol < 0 || 
                neighborCol >= cols ||
                isVisited[neighborRow][neighborCol]
            ) {
                continue;
            }

            isVisited[neighborRow][neighborCol] = true;
            const neighborHeight = heightMap[neighborRow][neighborCol];

            if (neighborHeight < currentCell.height) {
                totalWaterTrapped += currentCell.height - neighborHeight;
            }

            minHeap.enqueue({
                row: neighborRow,
                col: neighborCol,
                height: Math.max(neighborHeight, currentCell.height)
            });
        }
    }

    return totalWaterTrapped;
};
```