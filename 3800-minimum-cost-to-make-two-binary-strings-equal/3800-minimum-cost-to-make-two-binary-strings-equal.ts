function minimumCost(
  s: string,
  t: string,
  flipCost: number,
  swapCost: number,
  crossCost: number
): number {
  let cnt0 = 0;
  let cnt1 = 0;

  for (let i = 0; i < s.length; ++i) {
    if (s[i] === t[i]) continue;
    if (s[i] === "0") {
      ++cnt0;
    } else {
      ++cnt1;
    }
  }

  const cnt = cnt0 + cnt1;
  const pairs = Math.min(cnt0, cnt1);
  const crosses = (cnt >> 1) - pairs; // to minimize |cnt0 - cnt1| (i.e. maximize pairs).

  return Math.min(
    // 1. Just flip
    cnt * flipCost,
    // 2. Swap + flip
    pairs * swapCost + (cnt - pairs * 2) * flipCost,
    // 3. Cross + swap + flip
    crosses * crossCost + (cnt >> 1) * swapCost + (cnt & 1) * flipCost
  );
}