function numberOfSubmatrices(grid: string[][]): number {
  const n = grid.length;
  const m = grid[0].length;
  let prevSum = new Int32Array(m);
  let prevX = new Int32Array(m);
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const curSum = new Int32Array(m);
    const curX = new Int32Array(m);
    let leftSum = 0;
    let leftX = 0;
    for (let j = 0; j < m; j++) {
      const ch = grid[i][j];
      const val = ch === 'X' ? 1 : (ch === 'Y' ? -1 : 0);
      const isX = ch === 'X' ? 1 : 0;
      const up = prevSum[j];
      const upLeft = j > 0 ? prevSum[j - 1] : 0;
      const s = val + up + leftSum - upLeft;
      curSum[j] = s;
      const upX = prevX[j];
      const upLeftX = j > 0 ? prevX[j - 1] : 0;
      const xcount = isX + upX + leftX - upLeftX;
      curX[j] = xcount;
      if (s === 0 && xcount > 0) ans++;
      leftSum = s;
      leftX = xcount;
    }
    prevSum = curSum;
    prevX = curX;
  }
  return ans;
}