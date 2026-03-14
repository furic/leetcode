const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function orangesRotting(grid: number[][]): number {
  const queue: number[][] = [];
  let totalFresh = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == 2) {
        queue.push([y, x, 0]);
      } else if (grid[y][x] == 1) {
        totalFresh++;
      }
    }
  }
  if (!totalFresh) return 0;
  let maxStep = -1;

  while (queue.length) {
    const [y, x, step] = queue.shift();
    maxStep = step;
    for (const [dy, dx] of directions) {
      const [ny, nx] = [y + dy, x + dx];
      if (grid[ny]?.[nx] != 1) continue;
      grid[ny][nx] = 2;
      totalFresh--;
      queue.push([ny, nx, step + 1]);
    }
  }

  return totalFresh <= 0 ? maxStep : -1;
}