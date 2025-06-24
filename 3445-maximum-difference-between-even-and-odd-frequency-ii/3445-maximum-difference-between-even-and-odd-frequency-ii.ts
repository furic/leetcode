const maxDifference = (s: string, k: number): number => {
  const n = s.length;
  const freq = Array.from({ length: 5 }, () => new Uint16Array(n + 1));
  for (let i = 0; i < n; i++) {
    for (let d = 0; d < 5; d++) freq[d][i + 1] = freq[d][i];
    freq[s.charCodeAt(i) - 48][i + 1]++;
  }

  let res = -Infinity;
  for (let a = 0; a < 5; a++) {
    if (!freq[a][n]) continue;
    for (let b = 0; b < 5; b++) {
      if (a === b || !freq[b][n]) continue;
      res = Math.max(res, getMaxDiff(a, b, k, n, freq));
    }
  }
  return res;
};

const getMaxDiff = (
  a: number,
  b: number,
  k: number,
  n: number,
  freq: Uint16Array[]
): number => {
  let res = -Infinity, pa = 0, pb = 0;
  const minFreq = [
    [Infinity, Infinity],
    [Infinity, Infinity]
  ];

  for (let l = 0, r = k - 1; r < n; r++) {
    const fa = freq[a][r + 1], fb = freq[b][r + 1];
    while (r - l + 1 >= k && fb - pb >= 2) {
      minFreq[pa & 1][pb & 1] = Math.min(minFreq[pa & 1][pb & 1], pa - pb);
      pa = freq[a][++l];
      pb = freq[b][l];
    }
    const cand = fa - fb - minFreq[1 - (fa & 1)][fb & 1];
    res = Math.max(res, cand);
  }
  return res;
};