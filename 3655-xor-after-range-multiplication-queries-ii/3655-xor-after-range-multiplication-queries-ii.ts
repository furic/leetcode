function mulMod(a: bigint, b: bigint, MOD: bigint): bigint {
  return (a * b) % MOD;
}

function modPowerBig(base: bigint, exp: bigint, MOD: bigint): bigint {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

export function xorAfterQueries(nums: number[], queries: number[][]): number {
  const n = nums.length;
  const MOD = 1_000_000_007n;
  const S = (Math.sqrt(n) | 0) + 1;

  const bigNums = new BigInt64Array(n);
  for (let i = 0; i < n; i++) bigNums[i] = BigInt(nums[i]);

  // events[k][i] — накопленный множитель на позиции i для шага k
  // Float64Array с нейтралью 1.0
  const events: (Float64Array | null)[] = new Array(S).fill(null);

  const getEvents = (k: number): Float64Array => {
    if (!events[k]) {
      const arr = new Float64Array(n + 1).fill(1.0);
      events[k] = arr;
    }
    return events[k]!;
  };

  for (const q of queries) {
    const [l, r, k, v] = q;
    const vBig = BigInt(v);

    if (k >= S) {
      for (let i = l; i <= r; i += k) {
        bigNums[i] = (bigNums[i] * vBig) % MOD;
      }
      continue;
    }

    const e = getEvents(k);
    e[l] = Number((BigInt(e[l]) * vBig) % MOD);

    const rem = (r - l) % k;
    const r2 = rem === 0 ? r + k : r + (k - rem);
    if (r2 <= n) {
      const invV = modPowerBig(vBig, MOD - 2n, MOD);
      e[r2] = Number((BigInt(e[r2]) * invV) % MOD);
    }
  }

  for (let k = 1; k < S; k++) {
    const e = events[k];
    if (!e) continue;

    // Итерируем по независимым цепочкам: start=0,1,...,k-1
    for (let start = 0; start < k && start < n; start++) {
      let mult = 1n;
      for (let i = start; i < n; i += k) {
        const ev = e[i];
        if (ev !== 1.0) {
          mult = (mult * BigInt(ev)) % MOD;
        }
        if (mult !== 1n) {
          bigNums[i] = (bigNums[i] * mult) % MOD;
        }
      }
    }
  }

  let res = 0;
  for (let i = 0; i < n; i++) res ^= Number(bigNums[i]);
  return res;
}