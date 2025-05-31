const snakesAndLadders = (board: number[][]): number => {
    const n = board.length;
    const visited = Array(n * n + 1).fill(-1);
    const queue: number[] = [];

    visited[1] = 0;
    queue.push(1);

    const getCoordinates = (label: number): [number, number] => {
        const row = Math.floor((label - 1) / n);
        const col = (label - 1) % n;
        const realRow = n - 1 - row;
        const realCol = row % 2 === 0 ? col : n - 1 - col;
        return [realRow, realCol];
    };

    while (queue.length > 0) {
        const current = queue.shift()!;
        for (let roll = 1; roll <= 6 && current + roll <= n * n; roll++) {
            const next = current + roll;
            const [r, c] = getCoordinates(next);
            const destination = board[r][c] === -1 ? next : board[r][c];

            if (destination === n * n) return visited[current] + 1;
            if (visited[destination] === -1) {
                visited[destination] = visited[current] + 1;
                queue.push(destination);
            }
        }
    }

    return -1;
};