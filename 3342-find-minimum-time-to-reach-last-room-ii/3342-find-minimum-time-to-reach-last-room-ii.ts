const minTimeToReach = (moveTime: number[][]): number => {
    const rows = moveTime.length;
    const cols = moveTime[0].length;

    const minTime: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions: [number, number][] = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    const pq = new PriorityQueue<[number, number, number]>((a, b) => a[0] - b[0]);
    pq.enqueue([0, 0, 0]); // [time, x, y]
    minTime[0][0] = 0;

    while (!pq.isEmpty()) {
        const [time, x, y] = pq.dequeue();

        if (visited[x][y]) continue;
        visited[x][y] = true;

        if (x === rows - 1 && y === cols - 1) return time;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;

            const moveCost = ((x + y) % 2 === 0) ? 1 : 2;
            const arrivalTime = Math.max(time, moveTime[nx][ny]) + moveCost;

            if (arrivalTime < minTime[nx][ny]) {
                minTime[nx][ny] = arrivalTime;
                pq.enqueue([arrivalTime, nx, ny]);
            }
        }
    }

    return -1;
};