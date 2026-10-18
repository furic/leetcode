# Recursive Split Binomial Interleave Count | 45 Lines | O(n²) | 25ms

# Intuition
In a BST, the first element is the root. Every later element smaller than the root goes into the left subtree, and every larger one goes into the right subtree. Any reordering that keeps the root first and keeps each subtree's own relative insertion order yields the same BST. The left and right subsequences can be interleaved freely, and the number of interleavings is a binomial coefficient. The answer is the product of these counts over all nodes, minus 1 to exclude the original ordering.

# Approach
- **Precompute factorials and inverse factorials** up to `n` (modulo `10^9 + 7`):
  - Compute `factorial[i]` iteratively.
  - Get `inverseFactorial[n]` via Fermat's little theorem (`modPow(n!, MOD - 2)`).
  - Walk down with `inverseFactorial[i - 1] = inverseFactorial[i] * i`.
  - This gives O(1) `choose(total, pick)` queries.
- **Recursive `countWays(values)`:** returns `[subtree size, number of valid insertion orders]`.
  - Base case: 0 or 1 values returns `[length, 1]`.
  - The root is `values[0]`. Partition the remaining values into `leftValues` (smaller) and `rightValues` (larger), preserving their original order.
  - Recurse on both sides to get `(leftSize, leftWays)` and `(rightSize, rightWays)`.
  - Combine as `C(leftSize + rightSize, leftSize) * leftWays * rightWays`. The binomial counts the ways to interleave the two sequences while the root stays first.
  - Return `[1 + leftSize + rightSize, ways]`.
- The total from the root counts the original ordering as well, so return `(total - 1 + MOD) % MOD`.
- All modular arithmetic uses `BigInt` to avoid precision loss.

# Complexity
- Time complexity: $$O(n^2)$$ — each recursion level partitions its array in linear time, and a skewed tree has depth `n`. A balanced tree gives $$O(n \log n)$$. Factorial setup is $$O(n + \log \text{MOD})$$.

- Space complexity: $$O(n^2)$$ worst case — a skewed tree keeps partitioned arrays of sizes `n-1, n-2, ...` alive along the recursion path. The factorial tables are $$O(n)$$.

# Code
```typescript []
const numOfWays = (nums: number[]): number => {
    const MOD = 1_000_000_007n;
    const n = nums.length;

    const modPow = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        while (exp > 0n) {
            if (exp % 2n === 1n) result = result * base % MOD;
            base = base * base % MOD;
            exp /= 2n;
        }
        return result;
    };

    const factorial = new Array<bigint>(n + 1).fill(1n);
    for (let i = 1; i <= n; i++) factorial[i] = factorial[i - 1] * BigInt(i) % MOD;

    const inverseFactorial = new Array<bigint>(n + 1).fill(1n);
    inverseFactorial[n] = modPow(factorial[n], MOD - 2n);
    for (let i = n; i >= 1; i--) inverseFactorial[i - 1] = inverseFactorial[i] * BigInt(i) % MOD;

    const choose = (total: number, pick: number): bigint =>
        factorial[total] * inverseFactorial[pick] * inverseFactorial[total - pick] % MOD;

    const countWays = (values: number[]): [number, bigint] => {
        if (values.length <= 1) return [values.length, 1n];

        const root = values[0];
        const leftValues: number[] = [];
        const rightValues: number[] = [];
        for (let i = 1; i < values.length; i++) {
            if (values[i] < root) leftValues.push(values[i]);
            else rightValues.push(values[i]);
        }

        const [leftSize, leftWays] = countWays(leftValues);
        const [rightSize, rightWays] = countWays(rightValues);

        const ways = choose(leftSize + rightSize, leftSize) * leftWays % MOD * rightWays % MOD;

        return [1 + leftSize + rightSize, ways];
    };

    return Number((countWays(nums)[1] - 1n + MOD) % MOD);
};
```