const minMoves = (classroom: string[], energy: number): number => {
    const m = classroom.length;
    const n = classroom[0].length;

    let startI = -1, startJ = -1;
    const litterList: [number, number][] = [];
    const litterIndex: number[][] = Array.from({ length: m }, () =>
        Array(n).fill(-1)
    );

    let litterCount = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const cell = classroom[i][j];
            if (cell === 'S') {
                startI = i;
                startJ = j;
            } else if (cell === 'L') {
                litterList.push([i, j]);
                litterIndex[i][j] = litterCount++;
            }
        }
    }

    const totalLitters = litterList.length;
    const targetMask = (1 << totalLitters) - 1;

    if (totalLitters === 0) return 0;

    const dist: number[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array(1 << totalLitters).fill(-1)
        )
    );

    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    let queue: [number, number, number, number][] = [[startI, startJ, 0, energy]];
    dist[startI][startJ][0] = energy;

    let moves = 0;

    while (queue.length > 0) {
        const nextQueue: [number, number, number, number][] = [];

        for (const [i, j, mask, e] of queue) {
            for (const [dx, dy] of directions) {
                const ni = i + dx;
                const nj = j + dy;

                if (ni < 0 || ni >= m || nj < 0 || nj >= n || classroom[ni][nj] === 'X') {
                    continue;
                }

                if (e < 1) continue;

                let newEnergy = e - 1;
                if (classroom[ni][nj] === 'R') {
                    newEnergy = energy;
                }

                let newMask = mask;
                if (classroom[ni][nj] === 'L') {
                    const idx = litterIndex[ni][nj];
                    if (idx !== -1) {
                        newMask = mask | (1 << idx);
                    }
                }

                if (newMask === targetMask) {
                    return moves + 1;
                }

                if (newEnergy > dist[ni][nj][newMask]) {
                    dist[ni][nj][newMask] = newEnergy;
                    nextQueue.push([ni, nj, newMask, newEnergy]);
                }
            }
        }

        queue = nextQueue;
        moves++;
    }

    return -1;
};