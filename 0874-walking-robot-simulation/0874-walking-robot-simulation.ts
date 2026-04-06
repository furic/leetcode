const Direction = { West: 0, South: 1, East: 2, North: 3 } as const;

// Indexed by Direction: [West, South, East, North]
const dx = [-1, 0, 1, 0];
const dy = [ 0,-1, 0, 1];

const robotSim = (commands: number[], obstacles: number[][]): number => {
    const obstacleSet = new Set(obstacles.map(([x, y]) => (x << 16) + y));
    const isObstacle = (x: number, y: number) => obstacleSet.has((x << 16) + y);

    let x = 0, y = 0, dir = Direction.North;
    let maxDistSq = 0;

    for (const command of commands) {
        if (command === -1) {
            dir = (dir - 1 + 4) % 4; // Turn right
        } else if (command === -2) {
            dir = (dir + 1) % 4;     // Turn left
        } else {
            for (let step = 0; step < command; step++) {
                const nx = x + dx[dir];
                const ny = y + dy[dir];
                if (isObstacle(nx, ny)) break;
                x = nx;
                y = ny;
            }
            maxDistSq = Math.max(maxDistSq, x * x + y * y);
        }
    }

    return maxDistSq;
};