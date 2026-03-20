function minAbsDiff(grid: number[][], k: number): number[][] {
  const m = grid.length;
  const n = grid[0].length;
  const ans = Array.from({ length: m - k + 1 }, () =>
    Array<number>(n - k + 1).fill(0),
  );

  // Key optimization: buffer singleton.
  const values = new Int32Array(k * k);

  for (let i = m - k; i >= 0; --i) {
    for (let j = n - k; j >= 0; --j) {
      let idx = 0;
      
      for (let r = i; r < i + k; ++r) {
        for (let c = j; c < j + k; ++c) {
          values[idx++] = grid[r][c];
        }
      }

      values.sort();

      let minDiff = Infinity;

      for (let i = 1; i < values.length; ++i) {
        if (values[i] === values[i - 1]) continue;
        minDiff = Math.min(minDiff, values[i] - values[i - 1]);
      }

      if (minDiff < Infinity) ans[i][j] = minDiff;
    }
  }

  return ans;
}