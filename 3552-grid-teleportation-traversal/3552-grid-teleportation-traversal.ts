type Cell = [number, number];
type State = [number, number, number]; // [distance, row, col]

class MinHeap {
    private heap: State[] = [];

    push(state: State) {
        this.heap.push(state);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): State | undefined {
        const top = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length && end) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return top;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private bubbleUp(index: number) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][0] <= this.heap[index][0]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    private bubbleDown(index: number) {
        const length = this.heap.length;
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

const minMoves = (matrix: string[]): number => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const grid = matrix.map(row => row.split(''));

    // Directions: right, left, down, up
    const directions: Cell[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // Precompute all teleport portals
    const portals: Map<string, Cell[]> = new Map();
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const char = grid[r][c];
            if (char >= 'A' && char <= 'Z') {
                if (!portals.has(char)) portals.set(char, []);
                portals.get(char)!.push([r, c]);
            }
        }
    }

    const distance: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(Infinity)
    );
    distance[0][0] = 0;

    const usedPortal: Set<string> = new Set();
    const heap = new MinHeap();
    heap.push([0, 0, 0]); // [distance, row, col]

    while (!heap.isEmpty()) {
        const [dist, x, y] = heap.pop()!;
        if (x === numRows - 1 && y === numCols - 1) return dist;

        if (dist > distance[x][y]) continue;

        const cell = grid[x][y];
        if (cell >= 'A' && cell <= 'Z' && !usedPortal.has(cell)) {
            usedPortal.add(cell);
            for (const [px, py] of portals.get(cell)!) {
                if (px === x && py === y) continue;
                if (dist < distance[px][py]) {
                    distance[px][py] = dist;
                    heap.push([dist, px, py]); // Teleportation: 0 cost
                }
            }
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (
                newX >= 0 && newX < numRows &&
                newY >= 0 && newY < numCols &&
                grid[newX][newY] !== '#'
            ) {
                const newDist = dist + 1;
                if (newDist < distance[newX][newY]) {
                    distance[newX][newY] = newDist;
                    heap.push([newDist, newX, newY]);
                }
            }
        }
    }

    return -1; // Destination unreachable
};