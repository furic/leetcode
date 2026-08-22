# Binary Search + Inclusion-Exclusion LCM | 32 Lines | O(2ⁿ log(k·min)) | 4ms

# Intuition
The k-th reachable multiple across all coins can be found by binary searching on the answer `x` and counting how many reachable values are ≤ `x`. Counting uses inclusion-exclusion over coin subsets via their LCMs.

# Approach
- **Reduce coins:** Remove any coin that is a multiple of a smaller coin — it contributes no new multiples. This shrinks `n` and avoids redundant subset computation.
- **Inclusion-exclusion count:** For a value `x`, the count of multiples of at least one coin in `[1, x]` is:
  `Σ (-1)^(|S|+1) × floor(x / lcm(S))` over all non-empty subsets `S`.
- **Precompute LCM per bitmask:** Build `maskLCM[mask]` by extending from `mask & (mask-1)` (previous mask with lowest bit removed). Cap at `hi+1` to avoid BigInt overflow during count.
- **Binary search:** Find the smallest `x` such that `countReachable(x) >= k`. Use BigInt throughout to handle large products.
- **Bounds:** `lo = k` (minimum possible answer), `hi = coins[0] * k` (conservative upper bound — all k values from the smallest coin).

# Complexity
- Time complexity: $$O(2^n \log(k \cdot \min(coins)))$$ — precomputing `2^n` LCMs, then binary search with $$O(2^n)$$ counting per step.

- Space complexity: $$O(2^n)$$ — LCM table.

# Code
```typescript []
const findKthSmallest = (coins: number[], k: number): number => {
    coins.sort((a, b) => a - b);
    const reduced: number[] = [];
    for (const x of coins)
        if (reduced.every(y => x % y !== 0)) reduced.push(x);
    coins = reduced;

    const n = coins.length;
    const numMasks = 1 << n;

    const gcd = (a: bigint, b: bigint): bigint => {
        while (b !== 0n) { [a, b] = [b, a % b]; } return a;
    };
    const lowestSetBit = (x: number): number => {
        let i = 0; while ((x & 1) === 0) { i++; x >>= 1; } return i;
    };
    const popcount = (x: number): number => {
        let c = 0; while (x) { c += x & 1; x >>= 1; } return c;
    };

    let lo = BigInt(k);
    let hi = BigInt(coins[0]) * BigInt(k) + 1n;

    const maskLCM = new Array<bigint>(numMasks).fill(0n);
    maskLCM[0] = 1n;
    for (let mask = 1; mask < numMasks; mask++) {
        const prevMask = mask & (mask - 1);
        const coinBig = BigInt(coins[lowestSetBit(mask)]);
        const prevLCM = maskLCM[prevMask];
        const candidate = (prevLCM / gcd(prevLCM, coinBig)) * coinBig;
        maskLCM[mask] = candidate <= hi ? candidate : hi + 1n;
    }

    const countReachable = (x: bigint): bigint => {
        let total = 0n;
        for (let mask = 1; mask < numMasks; mask++) {
            if (maskLCM[mask] > x) continue;
            total += popcount(mask) & 1 ? x / maskLCM[mask] : -(x / maskLCM[mask]);
        }
        return total;
    };

    while (lo < hi) {
        const mid = (lo + hi) / 2n;
        if (countReachable(mid) >= k) hi = mid;
        else                          lo = mid + 1n;
    }

    return Number(lo);
};
```