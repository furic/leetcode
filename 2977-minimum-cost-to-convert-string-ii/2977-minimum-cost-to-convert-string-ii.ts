function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[]
): number {
  const n = source.length;

  // 1. Collect all unique patterns
  const set = new Set<string>();
  for (let s of original) set.add(s);
  for (let s of changed) set.add(s);

  const patterns = Array.from(set);
  const m = patterns.length;

  // map pattern -> index
  const id = new Map<string, number>();
  patterns.forEach((p, i) => id.set(p, i));

  // 2. cost between patterns (Floyd–Warshall)
  const dist: number[][] = Array.from({ length: m }, () =>
    Array(m).fill(Infinity)
  );
  for (let i = 0; i < m; i++) dist[i][i] = 0;

  // direct edges
  for (let i = 0; i < original.length; i++) {
    const u = id.get(original[i])!;
    const v = id.get(changed[i])!;
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  // all-pairs shortest path on pattern graph
  for (let k = 0; k < m; k++) {
    for (let i = 0; i < m; i++) {
      if (dist[i][k] === Infinity) continue;
      for (let j = 0; j < m; j++) {
        if (dist[k][j] === Infinity) continue;
        const nd = dist[i][k] + dist[k][j];
        if (nd < dist[i][j]) dist[i][j] = nd;
      }
    }
  }

  // 3. group patterns by length for fast matching
  const byLen = new Map<number, string[]>();
  for (let p of patterns) {
    const L = p.length;
    if (!byLen.has(L)) byLen.set(L, []);
    byLen.get(L)!.push(p);
  }

  // 4. DP on main string
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue;

    // case 1: no-op if chars already equal
    if (source[i] === target[i]) {
      dp[i + 1] = Math.min(dp[i + 1], dp[i]);
    }

    // case 2: try every possible pattern length
    for (const [len, list] of byLen) {
      if (i + len > n) continue;

      const sSub = source.slice(i, i + len);
      const tSub = target.slice(i, i + len);

      const u = id.get(sSub);
      const v = id.get(tSub);
      if (u === undefined || v === undefined) continue;

      const c = dist[u][v];
      if (c !== Infinity) {
        dp[i + len] = Math.min(dp[i + len], dp[i] + c);
      }
    }
  }

  return dp[n] === Infinity ? -1 : dp[n];
}