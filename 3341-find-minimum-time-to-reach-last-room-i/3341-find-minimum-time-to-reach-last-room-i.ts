interface Room {
    x: number;
    y: number;
    time: number;
}

const minTimeToReach = (moveTime: number[][]): number => {
    const rows = moveTime.length;
    const cols = moveTime[0].length;

    // Minimum time to reach each cell
    const minArrivalTime: number[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(Infinity),
    );

    // Track visited cells
    const visited: boolean[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(false),
    );

    // 4 directions: down, up, right, left
    const directions: [number, number][] = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
    ];

    // Priority queue: earlier time has higher priority
    const queue = new PriorityQueue<Room>((a, b) => a.time - b.time);
    queue.enqueue({ x: 0, y: 0, time: 0 });
    minArrivalTime[0][0] = 0;

    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        const { x, y, time } = current;

        if (visited[x][y]) continue;
        visited[x][y] = true;

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Check bounds
            if (newX < 0 || newX >= rows || newY < 0 || newY >= cols) continue;

            // Wait until the target room is available, then spend 1 sec to move
            const earliestMoveTime = Math.max(time, moveTime[newX][newY]) + 1;

            if (earliestMoveTime < minArrivalTime[newX][newY]) {
                minArrivalTime[newX][newY] = earliestMoveTime;
                queue.enqueue({ x: newX, y: newY, time: earliestMoveTime });
            }
        }
    }

    return minArrivalTime[rows - 1][cols - 1];
};