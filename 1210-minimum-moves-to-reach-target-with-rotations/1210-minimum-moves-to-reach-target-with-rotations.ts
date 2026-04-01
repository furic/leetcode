const minimumMoves = (grid: number[][]): number => {
    const n = grid.length;
    const HORIZONTAL = 0, VERTICAL = 1;
    const visited = new Set<string>();
    const queue: [number, number, number, number][] = [[0, 0, HORIZONTAL, 0]]; // [r, c, orientation, moves]

    const isEmpty = (r: number, c: number) =>
        r >= 0 && c >= 0 && r < n && c < n && grid[r][c] === 0;

    while (queue.length) {
        const [r, c, orientation, moves] = queue.shift()!;
        const key = `${r},${c},${orientation}`;
        if (visited.has(key)) continue;
        visited.add(key);

        if (r === n - 1 && c === n - 2 && orientation === HORIZONTAL) return moves;

        if (orientation === HORIZONTAL) {
            if (isEmpty(r, c + 2))                          queue.push([r, c + 1, HORIZONTAL, moves + 1]); // move right
            if (isEmpty(r + 1, c) && isEmpty(r + 1, c + 1)) {
                queue.push([r + 1, c, HORIZONTAL, moves + 1]); // move down
                queue.push([r, c, VERTICAL, moves + 1]);        // rotate clockwise
            }
        } else {
            if (isEmpty(r + 2, c))                          queue.push([r + 1, c, VERTICAL, moves + 1]);   // move down
            if (isEmpty(r, c + 1) && isEmpty(r + 1, c + 1)) {
                queue.push([r, c + 1, VERTICAL, moves + 1]);    // move right
                queue.push([r, c, HORIZONTAL, moves + 1]);       // rotate counterclockwise
            }
        }
    }

    return -1;
};