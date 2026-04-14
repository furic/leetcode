# Sieve + Greedy Scan | 22 Lines | O(N + S) | 137ms

# Intuition
Each element independently needs to reach either the nearest prime (even index) or the nearest non-prime (odd index) at or above its current value — since we can only increment, we always look forward for the closest valid target.

# Approach
- **Only increment is allowed**, so for each element we need the smallest valid value **≥ nums[i]**.
- We need a fast way to answer two queries per element:
  - *"What is the nearest prime ≥ v?"*
  - *"What is the nearest non-prime ≥ v?"*
- **Sieve of Eratosthenes** — precompute a boolean array `isComposite[0..200000]` where `0` = prime and `1` = composite/non-prime.
  - Upper bound `200_000` is chosen because the largest input value is `1e5`, and in the worst case the next prime after `1e5` is well within `200_000`.
  - Mark `0` and `1` as composite (neither is prime by definition).
  - For each `i` from `2` upward, if `i` is prime, mark all its multiples `i*i, i*i+i, ...` as composite.
  - This runs in **O(S log log S)** where `S = 200_000`.
- **`nextPrime(v)`** — starting at `v`, walk forward until `isComposite[v] === 0`. Returns the nearest prime ≥ v.
- **`nextNonPrime(v)`** — starting at `v`, walk forward until `isComposite[v] === 1`. Returns the nearest non-prime ≥ v.
- Both helpers are **O(gap)** per call, but amortised the prime gaps near `1e5` are tiny (at most ~70), so this is effectively O(1) per element in practice.
- **Main loop** — iterate once over `nums`:
  - Even index → cost = `nextPrime(nums[i]) - nums[i]`
  - Odd index  → cost = `nextNonPrime(nums[i]) - nums[i]`
  - Accumulate into `totalOps`.
- Sum all costs and return.

# Complexity
- Time complexity: $$O(S \log \log S + N)$$ — sieve dominates at ~O(S log log S) ≈ O(200000 · 3.2); the scan over N elements is linear.

- Space complexity: $$O(S)$$ — the `isComposite` Uint8Array of size 200001.

# Code
```typescript []
const minOperations = (nums: number[]): number => {
    const SIEVE_LIMIT = 200_000;
    const isComposite = new Uint8Array(SIEVE_LIMIT + 1);
    isComposite[0] = isComposite[1] = 1;
    for (let i = 2; i * i <= SIEVE_LIMIT; i++) {
        if (!isComposite[i]) {
            for (let j = i * i; j <= SIEVE_LIMIT; j += i) isComposite[j] = 1;
        }
    }

    const nextPrime = (v: number): number => {
        while (isComposite[v]) v++;
        return v;
    };

    const nextNonPrime = (v: number): number => {
        while (!isComposite[v]) v++;
        return v;
    };

    let totalOps = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i % 2 === 0) totalOps += nextPrime(nums[i])   - nums[i];
        else             totalOps += nextNonPrime(nums[i]) - nums[i];
    }

    return totalOps;
};
```