# Prefix Sum DP Over Digit-Sum Groups | 32 Lines | O(n × V) | 245ms

# Intuition
Numbers in `[0, 5000]` with a given digit sum form naturally sorted groups. The non-decreasing constraint means each position can only extend from values ≤ the current choice. This is a classic DP where we count valid sequences by accumulating prefix sums over sorted candidate groups.

# Approach
- **Precompute groups:** For each value `v` in `[0, 5000]`, compute its digit sum and bucket it into `numbersByDigitSum`. Since we iterate `v` in ascending order, each bucket is already sorted.
- **Map input to groups:** `groups[i]` = the sorted list of valid values for position `i` based on `digitSum[i]`. If any group is empty, return `0` immediately.
- **DP initialisation:** `dp[j] = 1` for all `j` in `groups[0]` — any value at the first position is valid.
- **DP transition (for each subsequent position `i`):**
  - Build `prefixSum` over the previous `dp` array: `prefixSum[k+1] = sum of dp[0..k]`.
  - Use a two-pointer `ptr` to find, for each value `currGroup[j]`, the count of previous-position values ≤ `currGroup[j]`. Since both groups are sorted, `ptr` only advances forward.
  - `newDp[j] = prefixSum[ptr]` — the total number of ways to arrive at `currGroup[j]` from any valid previous value.
- **Answer:** Sum all values in the final `dp` array, modulo `10^9 + 7`.
- `BigInt` is used throughout to avoid overflow during prefix sum accumulation before the final modulo.

# Complexity
- Time complexity: $$O(n \times V)$$ where $$V \leq 5001$$ — for each of the `n` positions, we process the group (size ≤ V) with prefix sums and a two-pointer scan.

- Space complexity: $$O(V)$$ — the groups map holds at most `5001` entries; `dp` and `prefixSum` are bounded by the largest group size.

# Code
```typescript []
const countArrays = (digitSum: number[]): number => {
    const MOD = 1_000_000_007n;

    const getDigitSum = (n: number): number => {
        let sum = 0;
        while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
        return sum;
    };

    const numbersByDigitSum = new Map<number, number[]>();
    for (let v = 0; v <= 5000; v++) {
        const s = getDigitSum(v);
        if (!numbersByDigitSum.has(s)) numbersByDigitSum.set(s, []);
        numbersByDigitSum.get(s)!.push(v);
    }

    const groups = digitSum.map(s => numbersByDigitSum.get(s) ?? []);
    if (groups.some(g => g.length === 0)) return 0;

    let dp = new Array<bigint>(groups[0].length).fill(1n);

    for (let i = 1; i < digitSum.length; i++) {
        const prevGroup = groups[i - 1];
        const currGroup = groups[i];

        const prefixSum = new Array<bigint>(prevGroup.length + 1).fill(0n);
        for (let k = 0; k < prevGroup.length; k++) {
            prefixSum[k + 1] = (prefixSum[k] + dp[k]) % MOD;
        }

        const newDp = new Array<bigint>(currGroup.length).fill(0n);
        let ptr = 0;
        for (let j = 0; j < currGroup.length; j++) {
            while (ptr < prevGroup.length && prevGroup[ptr] <= currGroup[j]) ptr++;
            newDp[j] = prefixSum[ptr];
        }

        dp = newDp;
    }

    return Number(dp.reduce((sum, ways) => (sum + ways) % MOD, 0n));
};
```