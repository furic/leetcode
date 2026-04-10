# Triple Index Span Minimization | 12 Lines | O(n³) | 1ms

# Intuition
For a sorted triple `i < j < k`, the distance simplifies to `2 * (k - i)` — the middle index `j` cancels out. So minimizing the distance is equivalent to minimizing the outer span `k - i` over all valid triples.

# Approach
- For each pair `(i, j)` with `i < j` and `nums[i] === nums[j]`, scan rightward from `j+1` for the first `k` where `nums[k] === nums[j]`.
- The `break` after finding `k` is correct: we want the smallest `k > j`, which gives the smallest span `k - i` for this `(i, j)` pair.
- Track the minimum `k - i` across all valid triples and return `2 * minDist`.
- Return `-1` if no good tuple is found.

# Complexity
- Time complexity: $$O(n^3)$$ — three nested loops; acceptable given `n ≤ 100`.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const minimumDistance = (nums: number[]): number => {
    let minDist = nums.length + 1;

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            if (nums[i] !== nums[j]) continue;
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[k] === nums[j]) {
                    minDist = Math.min(minDist, k - i);
                    break;
                }
            }
        }
    }

    return minDist === nums.length + 1 ? -1 : minDist * 2;
};
```