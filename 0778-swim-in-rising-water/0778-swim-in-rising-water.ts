function swimInWater(grid: number[][]): number {
    let n = grid.length;
    let directions = [
        [0,1],
        [0,-1],
        [1,0],
        [-1,0]
    ];

    let visited = new Set();
    let minHeap = new MinPriorityQueue((entry => entry[0]));
    minHeap.enqueue([grid[0][0], 0, 0]);
    visited.add('0,0');
    while(!minHeap.isEmpty()) {
        let curr = minHeap.dequeue();
        let t = curr[0];
        let x = curr[1];
        let y = curr[2];

        if(x==n-1 && y == n-1) {
            return t;
        }

        for(let direction of directions) {
            let nx = x+direction[0];
            let ny = y+direction[1];
            if(
                nx<0 || ny<0 || nx>=n || ny>=n || visited.has(`${nx},${ny}`)
            ) continue;

            visited.add(`${nx},${ny}`);
            minHeap.enqueue([Math.max(t, grid[nx][ny]), nx, ny])
        }

    }
};