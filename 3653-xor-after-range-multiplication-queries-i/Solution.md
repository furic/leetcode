# Direct Simulation Modular Multiply XOR | 8 Lines | O(q × n/k) | 316ms

# Intuition
Each query multiplies a strided range of elements modulo `10^9 + 7`. With small constraints (`n, q ≤ 10^3`), direct simulation is fast enough — just apply each query in order, then XOR the final array.

# Approach
- For each query `[left, right, step, multiplier]`, iterate indices `left, left+step, left+2·step, ...` up to `right`, updating `nums[i] = nums[i] * multiplier % MOD` in place.
- After all queries, XOR all elements of `nums` together and return.

# Complexity
- Time complexity: $$O(q \times n/k)$$ — each query steps through at most `n/k` elements; total work is bounded by `q × n` in the worst case (`k = 1`).

- Space complexity: $$O(1)$$ — mutation is in-place.

# Code
```typescript []
const xorAfterQueries = (nums: number[], queries: number[][]): number => {
    const MOD = 1_000_000_007;

    for (const [left, right, step, multiplier] of queries) {
        for (let i = left; i <= right; i += step) {
            nums[i] = nums[i] * multiplier % MOD;
        }
    }

    let result = 0;
    for (const num of nums) result ^= num;

    return result;
};
```