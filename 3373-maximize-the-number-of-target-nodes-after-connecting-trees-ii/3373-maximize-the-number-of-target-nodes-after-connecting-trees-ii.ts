const maxTargetNodes = (edges1: number[][], edges2: number[][]): number[] => {
  const n1 = edges1.length + 1, n2 = edges2.length + 1;
  const maxN = Math.max(n1, n2), q = new Int32Array(maxN);

  const getParity = (edges: number[][], n: number) => {
    const head = new Int32Array(n).fill(-1);
    const to = new Int32Array(edges.length * 2);
    const next = new Int32Array(edges.length * 2);
    let ptr = 0;
    for (const [u, v] of edges) {
      to[ptr] = v; next[ptr] = head[u]; head[u] = ptr++;
      to[ptr] = u; next[ptr] = head[v]; head[v] = ptr++;
    }

    const parity = new Int8Array(n).fill(-1);
    parity[0] = 0;
    let start = 0, end = 0;
    q[end++] = 0;
    let even = 1, odd = 0;

    while (start < end) {
      const node = q[start++];
      for (let i = head[node]; i !== -1; i = next[i]) {
        const nei = to[i];
        if (parity[nei] === -1) {
          parity[nei] = parity[node] ^ 1;
          parity[nei] ? odd++ : even++;
          q[end++] = nei;
        }
      }
    }

    return { parity, even, odd };
  };

  const { parity: p1, even: e1, odd: o1 } = getParity(edges1, n1);
  const { even: e2, odd: o2 } = getParity(edges2, n2);
  const best = Math.max(e2, o2), delta = e1 - o1;

  return Array.from({ length: n1 }, (_, i) => e1 - p1[i] * delta + best);
};