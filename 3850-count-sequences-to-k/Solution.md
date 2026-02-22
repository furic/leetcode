# Prime Exponent DFS + Memoization | 35 Lines | O(n × e2 × e3 × e5) | 213ms

# Intuition
Multiplying and dividing by a number is equivalent to adding and subtracting its prime exponents. Since `k` must be reachable through rational arithmetic starting from `1`, we only need to track how prime exponent "accumulators" evolve across choices — not the actual value of `val`.

# Approach
- **Key insight:** Any rational number produced by multiplying/dividing integers can be fully represented by its prime factorization. Since all inputs are integers ≤ 1000, their prime factors are limited. We only need to track primes `2`, `3`, and `5` — if `k` contains any other prime factor, it's immediately unreachable (return `0`).
- **Factorize `k`:** Extract exponents `[targetExp2, targetExp3, targetExp5]` and a remainder. If the remainder ≠ `1`, `k` has a prime factor other than `2, 3, 5`, so return `0` immediately.
- **Pre-factorize all `nums[i]`** into `[f2, f3, f5]` tuples to avoid repeating factorization during DFS.
- **DFS with memoization:** Define `dfs(i, acc2, acc3, acc5)` as the number of ways to process `nums[i..n-1]` such that the final accumulators reach `[targetExp2, targetExp3, targetExp5]`.
  - At each index `i`, three choices apply to the running accumulators:
    - **Multiply:** `acc += f` (add exponents)
    - **Divide:** `acc -= f` (subtract exponents)
    - **Skip:** `acc` unchanged
  - Base case: when `i === n`, return `1` if all three accumulators exactly match the targets, else `0`.
- **Memoization key** is `"i,acc2,acc3,acc5"` — the accumulators can go negative (from dividing) and must be tracked precisely.
- The state space is bounded by `n` positions × the range of each accumulator, which is at most `±(sum of all exponents)` per prime dimension.

# Complexity
- Time complexity: $$O(n \times E_2 \times E_3 \times E_5)$$ where $$E_p$$ is the total range of exponent accumulator for prime $$p$$ across all elements (bounded by sum of exponents in `nums`). In practice very fast due to limited prime exponents per number.

- Space complexity: $$O(n \times E_2 \times E_3 \times E_5)$$ for the memoization map.

# Code
```typescript []
const countSequences = (nums: number[], k: number): number => {
    const factorize = (x: number): [number, number, number, number] => {
        let exp2 = 0, exp3 = 0, exp5 = 0;
        while (x % 2 === 0) { exp2++; x /= 2; }
        while (x % 3 === 0) { exp3++; x /= 3; }
        while (x % 5 === 0) { exp5++; x /= 5; }
        return [exp2, exp3, exp5, x];
    };

    const [targetExp2, targetExp3, targetExp5, kRemainder] = factorize(k);
    if (kRemainder !== 1) return 0;

    const numFactors = nums.map(x => {
        const [a, b, c] = factorize(x);
        return [a, b, c] as [number, number, number];
    });

    const memo = new Map<string, number>();

    const dfs = (i: number, acc2: number, acc3: number, acc5: number): number => {
        if (i === nums.length) {
            return acc2 === targetExp2 && acc3 === targetExp3 && acc5 === targetExp5 ? 1 : 0;
        }

        const key = `${i},${acc2},${acc3},${acc5}`;
        if (memo.has(key)) return memo.get(key)!;

        const [f2, f3, f5] = numFactors[i];

        const ways =
            dfs(i + 1, acc2 + f2, acc3 + f3, acc5 + f5) +
            dfs(i + 1, acc2 - f2, acc3 - f3, acc5 - f5) +
            dfs(i + 1, acc2,       acc3,       acc5);

        memo.set(key, ways);
        return ways;
    };

    return dfs(0, 0, 0, 0);
};
```