const minMoves = (matrix: string[]): number => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const grid = matrix.map(row => row.split(''));

    const directions: [number, number][] = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    // Store portal locations: 'A' -> list of [row, col]
    const portals = new Map<string, [number, number][]>();
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const cell = grid[r][c];
            if (cell >= 'A' && cell <= 'Z') {
                if (!portals.has(cell)) portals.set(cell, []);
                portals.get(cell)!.push([r, c]);
            }
        }
    }

    const distance: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(Infinity)
    );
    distance[0][0] = 0;

    const usedPortal = new Set<string>();

    const pq = new PriorityQueue<[number, number, number]>(
        (a, b) => a[0] - b[0] // Min-heap based on distance
    );
    pq.enqueue([0, 0, 0]); // [distance, row, col]

    while (!pq.isEmpty()) {
        const [dist, row, col] = pq.dequeue();

        if (row === numRows - 1 && col === numCols - 1) return dist;
        if (dist > distance[row][col]) continue;

        const cell = grid[row][col];
        if (cell >= 'A' && cell <= 'Z' && !usedPortal.has(cell)) {
            usedPortal.add(cell);
            for (const [pr, pc] of portals.get(cell)!) {
                if (pr === row && pc === col) continue;
                if (dist < distance[pr][pc]) {
                    distance[pr][pc] = dist;
                    pq.enqueue([dist, pr, pc]);
                }
            }
        }

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                grid[newRow][newCol] !== '#'
            ) {
                const newDist = dist + 1;
                if (newDist < distance[newRow][newCol]) {
                    distance[newRow][newCol] = newDist;
                    pq.enqueue([newDist, newRow, newCol]);
                }
            }
        }
    }

    return -1; // Destination unreachable
};