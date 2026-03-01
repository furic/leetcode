# Frequency Count Linear Scan | 12 Lines | O(n) | 2ms 

# Intuition
Since values are bounded to `[1, 100]`, we can count frequencies in a fixed-size array and then scan values in ascending order. The first distinct value becomes our candidate `x`, and the first subsequent value with a different frequency becomes `y`.

# Approach
- Build a frequency array `freqs[1..100]` by iterating over `nums`.
- Scan values from `1` to `100` in ascending order, skipping values with frequency `0` (not present in `nums`):
  - The first present value encountered becomes `result[0]` (our `x` — smallest possible by construction).
  - For all subsequent present values, check if their frequency differs from `freqs[result[0]]`.
  - The first such value is `result[1]` (smallest valid `y` > `x` with different frequency) — return immediately.
- If no valid `y` is found after the full scan, return `[-1, -1]`.
- Scanning in ascending order naturally satisfies both tiebreaker rules: smallest `x` first, then smallest `y` for that `x`.

# Complexity
- Time complexity: $$O(n + V)$$ where $$V = 100$$ — one pass to build frequencies, one pass over the value range. Effectively $$O(n)$$ since $$V$$ is a constant.

- Space complexity: $$O(V) = O(1)$$ — fixed-size frequency array of length 101.

# Code
```typescript []
const minDistinctFreqPair = (nums: number[]): number[] => {
    const freqs = new Array<number>(101).fill(0);
    for (let num of nums) {
        freqs[num]++;
    }
    const result = [0, 0];
    for (let num = 1; num < 101; num++) {
        if (freqs[num] > 0) {
            if (result[0] === 0) {
                result[0] = num;
            } else if (freqs[result[0]] != freqs[num]) {
                result[1] = num;
                return result;
            }
        }
    }
    return [-1, -1];
};
```