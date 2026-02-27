# Parity-Based Strategy Selection | 16 Lines | O(n) | 13ms

# Intuition
Each operation flips exactly `k` indices. To turn all characters to `'1'`, every `'0'` must be flipped an odd total number of times, and every `'1'` must be flipped an even total number of times. This imposes hard parity constraints on the number of operations and `k`, narrowing the solution to at most two candidate strategies.

# Approach
- Count `zeroCount` and `oneCount = n - zeroCount` upfront.
- **Necessary parity condition:** Total flips across all indices = `ops × k`. The contribution from zeros is `zeroCount × (odd)` ≡ `zeroCount (mod 2)`, and from ones is `0 (mod 2)`. Therefore `ops × k ≡ zeroCount (mod 2)` must hold, or it's impossible.
- **Two strategies** based on how "extra" k-slot usage is distributed:
  - **Strategy A — even ops, zeros absorb both windows:** Valid when `zeroCount % 2 === 0`. Each operation can be thought of as consuming `k` zeros from one side and `(n - k)` zeros from the other side, with ones being flipped an even number of times (net no change). Lower bound is `max(ceil(zeroCount / k), ceil(zeroCount / (n - k)))`. Since ops must be **even** (to cancel out any ones accidentally flipped), round up to next even number if needed.
  - **Strategy B — odd ops, zeros absorbed by k-window, ones absorbed by (n-k)-window:** Valid when `zeroCount % 2 === k % 2`. Zeros are covered by the k-slot side (`ceil(zeroCount / k)` ops), and ones are covered by the remaining `(n - k)` slots acting as "garbage collectors" (`ceil(oneCount / (n - k))` ops). Lower bound is the max of these two. Since ops must be **odd** (the net effect across an odd number of ops flips zeros without restoring ones), round up to next odd number if needed.
- **Edge case:** When `n === k`, the only operation flips the entire string. This is only valid if the string is all `'0'` (1 op) or all `'1'` (0 ops).
- Return the minimum of both valid strategy results, or `-1` if neither applies.

# Complexity
- Time complexity: $$O(n)$$ — one pass to count zeros and ones; all strategy calculations are $$O(1)$$.

- Space complexity: $$O(1)$$ — only counters and arithmetic variables.

# Code
```typescript []
const minOperations = (s: string, k: number): number => {
    const n = s.length;
    const zeroCount = s.split('').filter(ch => ch === '0').length;
    const oneCount = n - zeroCount;

    if (n === k) {
        if (zeroCount === 0) return 0;
        if (zeroCount === n) return 1;
        return -1;
    }

    const ceilDiv = (x: number, y: number): number => Math.floor((x + y - 1) / y);

    let minOps = Infinity;

    if (zeroCount % 2 === 0) {
        let opsNeeded = Math.max(ceilDiv(zeroCount, k), ceilDiv(zeroCount, n - k));
        if (opsNeeded % 2 === 1) opsNeeded++;
        minOps = Math.min(minOps, opsNeeded);
    }

    if (zeroCount % 2 === k % 2) {
        let opsNeeded = Math.max(ceilDiv(zeroCount, k), ceilDiv(oneCount, n - k));
        if (opsNeeded % 2 === 0) opsNeeded++;
        minOps = Math.min(minOps, opsNeeded);
    }

    return minOps < Infinity ? minOps : -1;
};
```