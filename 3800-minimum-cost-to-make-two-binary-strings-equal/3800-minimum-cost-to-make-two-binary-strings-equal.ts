function minimumCost(
  s: string,
  t: string,
  flipCost: number,
  swapCost: number,
  crossCost: number
): number {
  const n = s.length;

  let m = 0;
  let b = 0;

  if (n >= 2048) {
    const sb = Buffer.from(s);
    const tb = Buffer.from(t);

    for (let i = 0; i < n; i++) {
      const x = (sb[i] ^ tb[i]) & 1;
      m += x;
      b += x & (sb[i] & 1);
    }
  } else {
    for (let i = 0; i < n; i++) {
      const cs = s.charCodeAt(i);
      const ct = t.charCodeAt(i);
      const x = (cs ^ ct) & 1;
      m += x;
      b += x & (cs & 1);
    }
  }

  if (m === 0) return 0;

  const a = m - b;

  const k = a < b ? a : b;
  const r = a < b ? (b - a) : (a - b);

  const twoF = flipCost + flipCost;
  const opp = swapCost < twoF ? swapCost : twoF;

  let same = crossCost + swapCost;
  if (twoF < same) same = twoF;

  return k * opp + ((r >> 1) * same) + ((r & 1) * flipCost);
}